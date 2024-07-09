import dotenv from 'dotenv';
import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './db/knexfile';
import accountRoutes from './routes/accountRoutes';

dotenv.config();
const environment: string = process.env.NODE_ENV || 'development';

const config = environment
const knex = Knex(config);
Model.knex(knex);

const app = express();
app.use(express.json());
app.use('/api/account', accountRoutes);

export default app;
