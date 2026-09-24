import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
  configureSecurityHeaders, 
  apiRateLimiter, 
  sanitizeInputs 
} from './src/middleware/security.js';
import { notFoundHandler, globalErrorHandler } from './src/middleware/errorHandler.js';
import logRoutes from './src/routes/logRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enhanced Security Headers via Helmet (HSTS, Anti-Clickjacking, Anti-MIME-sniffing)
app.use(configureSecurityHeaders());

// 2. Disable Express Fingerprinting
app.disable('x-powered-by');

// 3. Strict CORS Origin Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Origin not allowed.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 4. Request Payload Size Limits (DoS Prevention)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Input Sanitization & Prototype Pollution Defense
app.use(sanitizeInputs);

// 6. Global API Rate Limiting (Brute-Force & Flood Protection)
app.use('/api', apiRateLimiter);

// 7. Core API Routes
// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ASRA Wedding Canvas API is running securely',
    timestamp: new Date().toISOString()
  });
});

// Sample API Routes Placeholder
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Client Telemetry Logging Route
app.use('/api', logRoutes);

// 8. 404 Route Not Found Handler
app.use(notFoundHandler);

// 9. Centralized Error Handler (Prevents stack trace leaks in production)
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`[SECURE SERVER] Listening on port ${PORT}`);
});

export default app;
