import knex from 'knex';
import config from '../db/knexfile';

const db = knex(config);

export interface Transaction {
    id: number;
    user_id: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    target_user_id?: number;
    created_at: Date;
    updated_at: Date;
}

export const createTransaction = async (transaction: {
    amount: number;
    updated_at: Date;
    user_id: number;
    created_at: Date;
    target_user_id?: number;
    type: string;
}): Promise<Transaction> => {
    const trxArray: Transaction[] = await db('transactions').insert(transaction).returning('*');
    const trx = trxArray[0];
    return trx;
};

export const getTransactionsByUserId = async (user_id: number): Promise<Transaction[]> => {
    return db('transactions').where({ user_id });
};
