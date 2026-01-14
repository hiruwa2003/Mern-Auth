import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './Routes/userRoute.js';

const app = express();
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