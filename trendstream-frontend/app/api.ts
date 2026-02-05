import { NewsResponseDto, Page, TrendResponseDto } from "./types";

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

export const getTrends = (period: string = '24h', limit: number = 10): Promise<TrendResponseDto[]> => {
  return fetcher(`/api/trends?period=${period}&limit=${limit}`);
};
