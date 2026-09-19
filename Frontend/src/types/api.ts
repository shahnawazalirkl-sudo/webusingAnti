import { PaginationMeta } from './models';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
  error?: ApiErrorDetails;
}

export interface ApiErrorDetails {
  code?: string;
  details?: unknown;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}
