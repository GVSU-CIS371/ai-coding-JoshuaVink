<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStocksStore } from '@/stores/stocks';
import { useWatchlistStore } from '@/stores/watchlist';
import { useNotificationsStore } from '@/stores/notifications';

const stocksStore = useStocksStore();
const watchlistStore = useWatchlistStore();
const notifications = useNotificationsStore();

const symbols = computed(() => watchlistStore.items);

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

async function refreshAll() {
  if (!symbols.value.length) {
    return;
  }

  await stocksStore.refreshQuotes(symbols.value);
  notifications.success('Watchlist quotes refreshed.');
}

async function refreshSymbol(symbol: string) {
  await stocksStore.refreshQuote(symbol);
}

function removeSymbol(symbol: string) {
  watchlistStore.remove(symbol);
  notifications.show(`${symbol} removed from watchlist.`, 'info');
}

const anyLoading = computed(() => symbols.value.some((symbol) => stocksStore.loadingBySymbol[symbol]));

onMounted(() => {
  refreshAll();
});
</script>

<template>
  <v-card rounded="lg" class="mb-4">
    <v-card-title class="d-flex align-center">
      My Watchlist
      <v-spacer />
      <v-btn :disabled="!symbols.length || anyLoading" color="primary" @click="refreshAll">
        Refresh All
      </v-btn>
    </v-card-title>

    <v-alert v-if="stocksStore.error" type="error" class="mx-4 mb-4" variant="tonal">
      {{ stocksStore.error }}
    </v-alert>

    <v-card-text v-if="!symbols.length" class="text-medium-emphasis">
      No symbols yet. Add stocks from Search.
    </v-card-text>

    <v-table v-else>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Company</th>
          <th>Price</th>
          <th>Change</th>
          <th>% Change</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="symbol in symbols" :key="symbol">
          <td>{{ symbol }}</td>
          <td>{{ stocksStore.quotesBySymbol[symbol]?.name ?? '-' }}</td>
          <td>{{ formatCurrency(stocksStore.quotesBySymbol[symbol]?.price) }}</td>
          <td :class="`text-${changeColor(stocksStore.quotesBySymbol[symbol]?.change) ?? 'medium-emphasis'}`">
            {{ stocksStore.quotesBySymbol[symbol]?.change?.toFixed(2) ?? '-' }}
          </td>
          <td
            :class="`text-${changeColor(stocksStore.quotesBySymbol[symbol]?.changesPercentage) ?? 'medium-emphasis'}`"
          >
            {{ formatPercent(stocksStore.quotesBySymbol[symbol]?.changesPercentage) }}
          </td>
          <td>{{ formatTime(stocksStore.quotesBySymbol[symbol]?.lastUpdated) }}</td>
          <td>
            <div class="d-flex ga-2">
              <v-btn
                size="small"
                variant="tonal"
                color="secondary"
                :loading="stocksStore.loadingBySymbol[symbol]"
                @click="refreshSymbol(symbol)"
              >
                Refresh
              </v-btn>
              <v-btn size="small" variant="text" color="error" @click="removeSymbol(symbol)">
                Remove
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
