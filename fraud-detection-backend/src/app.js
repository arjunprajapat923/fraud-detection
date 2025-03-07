import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateMarkFraud } from './middleware/validation';
import { getFraudulentTransactions, markAsFraudulent } from './controllers/transactions';

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173'
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.get('/fraudulent', getFraudulentTransactions);
app.post('/fraudulent', validateMarkFraud, markAsFraudulent);

export default app;