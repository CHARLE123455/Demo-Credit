import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.enum('type', ['deposit', 'withdrawal', 'transfer']).notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.integer('target_user_id').unsigned();
        table.timestamps(true, true);

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('target_user_id').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}
