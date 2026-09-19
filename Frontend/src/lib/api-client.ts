import { ApiResponse } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { body, headers, ...customConfig } = options;
  
  // Extract token from local storage or cookie, depending on your auth strategy
  // For now, assuming token might be stored in localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Attempt to parse JSON response
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        response.status,
        (responseData as ApiResponse)?.message || response.statusText || 'An error occurred during the request',
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error instanceof Error ? error.message : 'Unknown network error');
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },
  post: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) => {
    return request<T>(endpoint, { ...options, method: 'POST', body });
  },
  put: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) => {
    return request<T>(endpoint, { ...options, method: 'PUT', body });
  },
  patch: <T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method' | 'body'>) => {
    return request<T>(endpoint, { ...options, method: 'PATCH', body });
  },
  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
