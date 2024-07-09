import knex from '../db/knexfile';
import { createTransaction, getTransactionsByUserId } from '../models/transactionModel';
import { getUserById } from '../models/userModel';

export const fundAccount = async (user_id: number, amount: number) => {
    const user = await getUserById(user_id);
    if (!user) throw new Error('User not found');

    await knex.transaction(async (trx) => {
        await trx('users').where({ id: user_id }).increment('balance', amount);
        await createTransaction({
            created_at: Date.now() ,
            target_user_id: 0,
            updated_at: Date.now(),
            user_id, type: 'deposit', amount
        });
    });
};

export const transferFunds = async (from_user_id: number, to_user_id: number, amount: number) => {
    const fromUser = await getUserById(from_user_id);
    const toUser = await getUserById(to_user_id);
    if (!fromUser || !toUser) throw new Error('User not found');
    if (fromUser.balance < amount) throw new Error('Insufficient balance');

    await knex.transaction(async (trx) => {
        await trx('users').where({ id: from_user_id }).decrement('balance', amount);
        await trx('users').where({ id: to_user_id }).increment('balance', amount);
        await createTransaction({
            created_at: Date.now(),
            updated_at: Date.now(),
            user_id: from_user_id, type: 'transfer', amount, target_user_id: to_user_id
        });
    });
};

export const withdrawFunds = async (user_id: number, amount: number) => {
    const user = await getUserById(user_id);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient balance');

    await knex.transaction(async (trx) => {
        await trx('users').where({ id: user_id }).decrement('balance', amount);
        await createTransaction({
            created_at: Date.now(),
            target_user_id: 0,
            updated_at: Date.now(),
            user_id, type: 'withdrawal', amount
        });
    });
};
