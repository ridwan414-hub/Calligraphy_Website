import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
dotenv.config();


const app = express();
connectDB()
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/payment', paymentRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan.white);
});