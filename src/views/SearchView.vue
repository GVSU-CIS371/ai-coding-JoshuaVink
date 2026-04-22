<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useStocksStore } from '@/stores/stocks';
import { useWatchlistStore } from '@/stores/watchlist';
import { useNotificationsStore } from '@/stores/notifications';

const stocksStore = useStocksStore();
const watchlistStore = useWatchlistStore();
const notifications = useNotificationsStore();

const query = ref('');
const debounceMs = 400;
const presetSymbols = ['AAPL', 'MSFT', 'TSLA'];
let debounceTimer: number | null = null;

function formatCurrency(value?: number): string {
  if (value === undefined) {
    return '-';
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatPercent(value?: number): string {
  if (value === undefined) {
    return '-';
  }
  return `${value.toFixed(2)}%`;
}

function formatTime(timestamp?: number): string {
  if (!timestamp) {
    return '-';
  }
  return new Date(timestamp).toLocaleTimeString();
}

function changeColor(value?: number): 'success' | 'error' | undefined {
  if (value === undefined || value === 0) {
    return undefined;
  }
  return value > 0 ? 'success' : 'error';
}

function queueSearch(value: string) {
  if (debounceTimer !== null) {
    window.clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(() => {
    stocksStore.searchStocks(value);
  }, debounceMs);
}

watch(query, (value) => {
  queueSearch(value);
});

onBeforeUnmount(() => {
  if (debounceTimer !== null) {
    window.clearTimeout(debounceTimer);
  }
});

function pickPreset(symbol: string) {
  query.value = symbol;
  stocksStore.searchStocks(symbol);
}

async function addToWatchlist(symbol: string) {
  if (watchlistStore.hasSymbol(symbol)) {
    notifications.show(`${symbol} is already in your watchlist.`, 'info');
    return;
  }

  watchlistStore.add(symbol);
  await stocksStore.refreshQuote(symbol);
  notifications.success(`${symbol} added to watchlist.`);
}

const hasResults = computed(() => stocksStore.searchResults.length > 0);
</script>

<template>
  <v-card class="pa-4 mb-4" rounded="lg">
    <v-card-title class="px-0">Find Stocks</v-card-title>
    <v-card-text class="px-0">
      <v-text-field
        v-model="query"
        label="Search by company name"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        hide-details
      />

      <div class="mt-4 d-flex ga-2 flex-wrap align-center">
        <span class="text-medium-emphasis">Quick picks:</span>
        <v-btn
          v-for="symbol in presetSymbols"
          :key="symbol"
          size="small"
          variant="tonal"
          color="secondary"
          @click="pickPreset(symbol)"
        >
          {{ symbol }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <v-alert v-if="stocksStore.error" type="error" class="mb-4" variant="tonal">
    {{ stocksStore.error }}
  </v-alert>

  <v-card rounded="lg">
    <v-card-title class="d-flex align-center">
      Search Results
      <v-spacer />
      <v-progress-circular v-if="stocksStore.searchLoading" color="primary" indeterminate size="22" />
    </v-card-title>

    <v-table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Company</th>
          <th>Price</th>
          <th>Change</th>
          <th>% Change</th>
          <th>Updated</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in stocksStore.searchResults" :key="item.symbol">
          <td>{{ item.symbol }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatCurrency(stocksStore.quotesBySymbol[item.symbol]?.price) }}</td>
          <td :class="`text-${changeColor(stocksStore.quotesBySymbol[item.symbol]?.change) ?? 'medium-emphasis'}`">
            {{ stocksStore.quotesBySymbol[item.symbol]?.change?.toFixed(2) ?? '-' }}
          </td>
          <td
            :class="`text-${changeColor(stocksStore.quotesBySymbol[item.symbol]?.changesPercentage) ?? 'medium-emphasis'}`"
          >
            {{ formatPercent(stocksStore.quotesBySymbol[item.symbol]?.changesPercentage) }}
          </td>
          <td>{{ formatTime(stocksStore.quotesBySymbol[item.symbol]?.lastUpdated) }}</td>
          <td>
            <v-btn
              color="primary"
              size="small"
              variant="flat"
              :disabled="watchlistStore.hasSymbol(item.symbol)"
              @click="addToWatchlist(item.symbol)"
            >
              Add
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-card-text v-if="!stocksStore.searchLoading && !hasResults" class="text-medium-emphasis">
      Search for a company to see live quote data.
    </v-card-text>
  </v-card>
</template>
