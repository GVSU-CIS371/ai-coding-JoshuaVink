import { defineStore } from 'pinia';

const WATCHLIST_STORAGE_KEY = 'watchlist_items';

function loadItems(): string[] {
  const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return parsed.map((value) => value.toUpperCase());
  } catch {
    return [];
  }
}

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    items: loadItems()
  }),
  getters: {
    hasSymbol: (state) => (symbol: string): boolean => state.items.includes(symbol.toUpperCase())
  },
  actions: {
    persist() {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(this.items));
    },
    add(symbol: string) {
      const normalized = symbol.toUpperCase();
      if (!this.items.includes(normalized)) {
        this.items.push(normalized);
        this.persist();
      }
    },
    remove(symbol: string) {
      const normalized = symbol.toUpperCase();
      this.items = this.items.filter((item) => item !== normalized);
      this.persist();
    },
    clear() {
      this.items = [];
      this.persist();
    }
  }
});
