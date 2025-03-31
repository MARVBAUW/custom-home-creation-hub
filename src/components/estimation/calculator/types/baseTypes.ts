
// Base type definitions that might be reused across the application

export interface BaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export type ResponseStatus = 'success' | 'error' | 'loading' | 'idle';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StringKeyObject {
  [key: string]: any;
}

export type CallbackFunction = (...args: any[]) => void;
