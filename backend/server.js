import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import paymentRoutes from './routes/paymentRoute.js';


dotenv.config();
const app = express();
connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', paymentRoutes)

app.use(express.static(path.join(__dirname, './client/build')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
});