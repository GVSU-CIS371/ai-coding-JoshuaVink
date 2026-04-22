<script setup lang="ts">
import { computed, ref } from 'vue';
import { API_KEY_STORAGE_KEY, getStoredOrDefaultApiKey, hasDefaultApiKey } from '@/services/fmp';
import { useStocksStore } from '@/stores/stocks';
import { useNotificationsStore } from '@/stores/notifications';

const stocksStore = useStocksStore();
const notifications = useNotificationsStore();

const apiKey = ref(localStorage.getItem(API_KEY_STORAGE_KEY) ?? getStoredOrDefaultApiKey());
const testing = ref(false);
const usingLocalKey = computed(() => Boolean(localStorage.getItem(API_KEY_STORAGE_KEY)?.trim()));
const usingDefaultKey = computed(() => !usingLocalKey.value && hasDefaultApiKey());

function saveKey() {
  const trimmed = apiKey.value.trim();

  if (!trimmed) {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    notifications.show('Local API key cleared. App will use shared default if configured.', 'info');
    return;
  }

  localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);
  notifications.success('API key saved locally.');
}

async function testKey() {
  const trimmed = apiKey.value.trim();
  if (!trimmed) {
    notifications.error('Enter an API key first.');
    return;
  }

  testing.value = true;
  localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);

  try {
    await stocksStore.refreshQuote('AAPL');
    if (stocksStore.error) {
      notifications.error(stocksStore.error);
      return;
    }
    notifications.success('API key is valid. Test quote loaded for AAPL.');
  } catch {
    notifications.error('Unable to verify API key right now.');
  } finally {
    testing.value = false;
  }
}
</script>

<template>
  <v-card class="pa-4" rounded="lg">
    <v-card-title class="px-0">API Settings</v-card-title>
    <v-card-text class="px-0">
      <div class="d-flex align-center ga-2 mb-3">
        <v-chip v-if="usingLocalKey" color="success" size="small" variant="tonal">Using your saved key</v-chip>
        <v-chip v-else-if="usingDefaultKey" color="info" size="small" variant="tonal">Using shared default key</v-chip>
        <v-chip v-else color="warning" size="small" variant="tonal">No key configured</v-chip>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" icon="mdi-information-outline" size="18" />
          </template>
          <span>Your saved key overrides the shared default key.</span>
        </v-tooltip>
      </div>

      <v-text-field
        v-model="apiKey"
        label="Financial Modeling Prep API Key"
        hint="Stored in browser localStorage. Leave empty to fall back to shared default key (if available)."
        persistent-hint
        prepend-inner-icon="mdi-key-variant"
        variant="outlined"
      />

      <p class="text-caption text-medium-emphasis mt-2 mb-0">
        Need your own key? Get one at
        <a href="https://financialmodelingprep.com/developer/docs" target="_blank" rel="noopener noreferrer">
          financialmodelingprep.com
        </a>.
      </p>

      <div class="d-flex ga-2 mt-4">
        <v-btn color="primary" @click="saveKey">Save Key</v-btn>
        <v-btn color="secondary" :loading="testing" @click="testKey">Test Key (AAPL)</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
