import dotenv from 'dotenv';
import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import config from './db/knexfile';
import accountRoutes from './routes/accountRoutes';



// Load environment variables
dotenv.config();
const environment: string = process.env.NODE_ENV || 'development';


// Configure Knex with proper TypeScript types
const knexConfiguration = config[environment as keyof typeof config];
if(!knexConfiguration) {
    throw new Error(`No configuration found for environment: ${environment}`);
};


// Initialize Knex with the configuration
const knex = Knex(knexConfiguration);


// Bind Objection.js to Knex
Model.knex(knex);

// Initialize Express app
const app = express();
app.use(express.json());

// Mount routes
app.use('/api/account', accountRoutes);

export default app;
