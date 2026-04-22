const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';
export const API_KEY_STORAGE_KEY = 'fmp_api_key';
const DEFAULT_API_KEY = import.meta.env.VITE_FMP_DEFAULT_API_KEY?.trim() ?? '';

export interface SearchItem {
  symbol: string;
  name: string;
  exchangeShortName?: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  lastUpdated: number;
}

export interface StockProfile {
  symbol: string;
  companyName: string;
  image?: string;
  website?: string;
  description?: string;
}

function getApiKey(): string {
  const key = localStorage.getItem(API_KEY_STORAGE_KEY)?.trim() || DEFAULT_API_KEY;
  if (!key) {
    throw new Error('Missing FMP API key. Add it in Settings.');
  }
  return key;
}

export function hasDefaultApiKey(): boolean {
  return Boolean(DEFAULT_API_KEY);
}

export function getStoredOrDefaultApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY)?.trim() || DEFAULT_API_KEY;
}

async function fetchJson<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const apiKey = getApiKey();
  const searchParams = new URLSearchParams({ ...params, apikey: apiKey });
  const response = await fetch(`${FMP_BASE_URL}${endpoint}?${searchParams.toString()}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `FMP request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchSearch(query: string): Promise<SearchItem[]> {
  if (!query.trim()) {
    return [];
  }

  const data = await fetchJson<Array<{ symbol?: string; name?: string; exchangeShortName?: string }>>(
    '/search-name',
    { query: query.trim() }
  );

  return data
    .filter((item) => item.symbol)
    .map((item) => ({
      symbol: item.symbol ?? '',
      name: item.name ?? item.symbol ?? 'Unknown',
      exchangeShortName: item.exchangeShortName
    }));
}

export async function fetchQuote(symbol: string): Promise<StockQuote> {
  const data = await fetchJson<
    Array<{
      symbol?: string;
      name?: string;
      price?: number;
      change?: number;
      changesPercentage?: number;
      timestamp?: number;
    }>
  >('/quote', { symbol: symbol.toUpperCase() });

  const quote = data[0];
  if (!quote?.symbol) {
    throw new Error(`No quote found for ${symbol.toUpperCase()}.`);
  }

  return {
    symbol: quote.symbol,
    name: quote.name ?? quote.symbol,
    price: Number(quote.price ?? 0),
    change: Number(quote.change ?? 0),
    changesPercentage: Number(quote.changesPercentage ?? 0),
    lastUpdated: quote.timestamp ? quote.timestamp * 1000 : Date.now()
  };
}

export async function fetchProfile(symbol: string): Promise<StockProfile | null> {
  const data = await fetchJson<Array<{ symbol?: string; companyName?: string; image?: string; website?: string; description?: string }>>(
    '/profile',
    { symbol: symbol.toUpperCase() }
  );

  const profile = data[0];
  if (!profile?.symbol) {
    return null;
  }

  return {
    symbol: profile.symbol,
    companyName: profile.companyName ?? profile.symbol,
    image: profile.image,
    website: profile.website,
    description: profile.description
  };
}
