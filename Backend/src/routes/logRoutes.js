import express from 'express';
import { logClientError } from '../controllers/logController.js';

const router = express.Router();

// Client telemetry reporting endpoint
router.post('/log-client-error', logClientError);

export default router;
