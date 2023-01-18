/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable('clean_ups', (table) => {
          table.increments('id').primary();
          table.string("name").notNullable();
          table.string("email").notNullable();
          table.date('date_of_clean_up').notNullable();
          table.string("time_of_clean_up").notNullable();
          table.string('city').notNullable();
          table.string('state').notNullable();
          table.string('country').notNullable();
          table.specificType('long_map_value', 'double precision').notNullable();
          table.specificType('lat_map_value', 'double precision').notNullable();
          table.timestamps(true, true);
        })
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('cell_phone');
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
          })
          .alterTable('clean_ups', (table) => {
            table.integer("user_id").unsigned().notNullable();
            table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          })
          .alterTable('users', (table) => {
            table.integer("clean_up_id").unsigned();
            table
            .foreign("clean_up_id")
            .references("id")
            .inTable("clean_ups")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
          });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('clean_ups');
};
