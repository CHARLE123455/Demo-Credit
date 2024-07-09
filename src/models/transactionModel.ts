import knex from '../db/knexfile';

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
    updated_at: number;
    user_id: number;
    created_at: number;
    target_user_id: number;
    type: string
}): Promise<Transaction> => {
    const [trx] = await knex('transactions').insert(transaction).returning('*');
    return trx;
};

export const getTransactionsByUserId = async (user_id: number): Promise<Transaction[]> => {
    return knex('transactions').where({ user_id });
};
