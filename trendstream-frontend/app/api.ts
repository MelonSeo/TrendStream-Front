import { NewsResponseDto, Page, TrendResponseDto, Dashboard, SourceStats, HourlyStats, DailyStats, SubscriptionCreateRequest, SubscriptionResponse, UserSubscriptions } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorBody.message || 'API request failed');
  }
  return res.json();
};

export const getNews = (page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news?page=${page}&size=${size}`);
};

export const getNewsById = (id: number): Promise<NewsResponseDto> => {
  return fetcher(`/api/news/${id}`);
};

export const searchNews = (keyword: string, page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news/search?keyword=${keyword}&page=${page}&size=${size}`);
};

export const getPopularNews = (page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news/popular?page=${page}&size=${size}`);
};

export const searchByTag = (tagName: string, page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news/tag?name=${encodeURIComponent(tagName)}&page=${page}&size=${size}`);
};

export const getTrends = (period: string = '24h', limit: number = 10): Promise<TrendResponseDto[]> => {
  return fetcher(`/api/trends?period=${period}&limit=${limit}`);
};

export const getNewsByCategory = (category: string, page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news/category?name=${encodeURIComponent(category)}&page=${page}&size=${size}`);
};

export const getCategories = (): Promise<string[]> => {
  return fetcher(`/api/news/categories`);
};

export const getNewsBySource = (source: string, page: number = 0, size: number = 10): Promise<Page<NewsResponseDto>> => {
  return fetcher(`/api/news/source?name=${encodeURIComponent(source)}&page=${page}&size=${size}`);
};

export const getSources = (): Promise<string[]> => {
  return fetcher(`/api/news/sources`);
};

// Stats API
export const getStatsDashboard = (): Promise<Dashboard> => {
  return fetcher(`/api/stats/dashboard`);
};

export const getSourceStats = (days: number = 7): Promise<SourceStats[]> => {
  return fetcher(`/api/stats/sources?days=${days}`);
};

export const getHourlyStats = (date?: string): Promise<HourlyStats[]> => {
  const query = date ? `?date=${date}` : '';
  return fetcher(`/api/stats/hourly${query}`);
};

export const getDailyStats = (days: number = 7): Promise<DailyStats[]> => {
  return fetcher(`/api/stats/daily?days=${days}`);
};

// Subscription API
const API_BASE_URL_RAW = process.env.NEXT_PUBLIC_API_URL;

export const subscribe = async (request: SubscriptionCreateRequest): Promise<SubscriptionResponse> => {
  const res = await fetch(`${API_BASE_URL_RAW}/api/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorBody.message || 'Subscribe failed');
  }
  return res.json();
};

export const unsubscribe = async (email: string, keyword: string): Promise<void> => {
  const res = await fetch(
    `${API_BASE_URL_RAW}/api/subscriptions?email=${encodeURIComponent(email)}&keyword=${encodeURIComponent(keyword)}`,
    { method: 'DELETE' }
  );
  if (!res.ok) {
    throw new Error('Unsubscribe failed');
  }
};

export const getUserSubscriptions = (email: string): Promise<UserSubscriptions> => {
  return fetcher(`/api/subscriptions?email=${encodeURIComponent(email)}`);
};

export const getActiveKeywords = (): Promise<string[]> => {
  return fetcher(`/api/subscriptions/keywords`);
};
