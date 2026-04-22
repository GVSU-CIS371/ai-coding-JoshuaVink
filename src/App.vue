<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '@/stores/notifications';

const notifications = useNotificationsStore();
const { visible, message, color } = storeToRefs(notifications);
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable" flat>
      <v-app-bar-title>Stock Watchlist MVP</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" variant="text">Search</v-btn>
      <v-btn to="/watchlist" variant="text">Watchlist</v-btn>
      <v-btn to="/settings" variant="text">Settings</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <v-snackbar v-model="visible" :color="color" timeout="3200">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>
