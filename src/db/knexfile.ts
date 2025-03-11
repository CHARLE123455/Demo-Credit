import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();
interface KnexConfig {
    [key: string]: Knex.Config;
}

const config: KnexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
    
};

export default config;
