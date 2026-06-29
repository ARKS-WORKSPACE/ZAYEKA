import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/events', eventRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'Zayeka API is running smoothly' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`\x1b[31m%s\x1b[0m`, `Error: ${err.message}`);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
