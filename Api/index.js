import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './Routes/userRoute.js';
import AuthRouter from './Routes/authRoute.js';

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {  
  res.json({ message: 'API is running' });
});

app.use('/api/user',UserRouter);
app.use('/api/auth',AuthRouter);


//Middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message , statusCode});
});