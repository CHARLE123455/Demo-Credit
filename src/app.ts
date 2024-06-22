import express from 'express';
import accountRoutes from './routes/accountRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/account', accountRoutes);

export default app;
