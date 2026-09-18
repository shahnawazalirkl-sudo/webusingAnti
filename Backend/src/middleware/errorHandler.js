/**
 * 404 Route Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    statusCode: 404,
    path: req.originalUrl
  });
};

/**
 * Global Centralized Error Handler
 * - Prevents internal stack traces from leaking to clients
 * - Standardizes API error responses
 */
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log error internally for debugging
  console.error(`[API ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 && isProduction 
      ? 'An unexpected server error occurred. Please try again later.' 
      : err.message || 'Internal Server Error',
    statusCode: statusCode,
    ...(isProduction ? {} : { stack: err.stack })
  });
};
