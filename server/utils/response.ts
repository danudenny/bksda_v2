/**
 * Standardized API response utilities
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  timestamp: string;
}

export const successResponse = <T>(
  message: string,
  data?: T,
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const errorResponse = (
  message: string,
  errors?: any,
): ApiResponse => {
  return {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
};

export const paginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = "Data retrieved successfully",
) => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      pages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  };
};
