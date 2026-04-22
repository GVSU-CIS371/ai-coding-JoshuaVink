import { defineStore } from 'pinia';
import { fetchQuote, fetchSearch, type SearchItem, type StockQuote } from '@/services/fmp';

interface StocksState {
  searchResults: SearchItem[];
  quotesBySymbol: Record<string, StockQuote>;
  searchLoading: boolean;
  loadingBySymbol: Record<string, boolean>;
  error: string | null;
}

export const useStocksStore = defineStore('stocks', {
  state: (): StocksState => ({
    searchResults: [],
    quotesBySymbol: {},
    searchLoading: false,
    loadingBySymbol: {},
    error: null
  }),
  actions: {
    clearError() {
      this.error = null;
    },
    async searchStocks(query: string) {
      const cleaned = query.trim();
      if (!cleaned) {
        this.searchResults = [];
        return;
      }

      this.searchLoading = true;
      this.error = null;

      try {
        const results = await fetchSearch(cleaned);
        this.searchResults = results;

        const symbols = results.slice(0, 8).map((item) => item.symbol);
        await this.refreshQuotes(symbols);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to search stocks.';
      } finally {
        this.searchLoading = false;
      }
    },
    async refreshQuote(symbol: string) {
      const normalized = symbol.toUpperCase();
      this.loadingBySymbol[normalized] = true;
      this.error = null;

      try {
        const quote = await fetchQuote(normalized);
        this.quotesBySymbol[normalized] = quote;
      } catch (error) {
        this.error = error instanceof Error ? error.message : `Failed to fetch quote for ${normalized}.`;
      } finally {
        this.loadingBySymbol[normalized] = false;
      }
    },
    async refreshQuotes(symbols: string[]) {
      const uniqueSymbols = Array.from(new Set(symbols.map((symbol) => symbol.toUpperCase())));
      await Promise.all(uniqueSymbols.map((symbol) => this.refreshQuote(symbol)));
    }
  }
});
