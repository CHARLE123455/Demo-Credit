import knex from '../db/knexfile';

export interface User {
    id: number;
    username: string;
    email: string;
    balance: number;
    created_at: Date;
    updated_at: Date;
}

export const createUser = async (username: string, email: string): Promise<User> => {
    const [user] = await knex('users').insert({ username, email }).returning('*');
    return user;
};

export const getUserById = async (id: number): Promise<User | undefined> => {
    return knex('users').where({ id }).first();
};
