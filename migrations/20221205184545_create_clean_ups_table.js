/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('clean_ups', (table) => {
      table.increments('id').primary();
      table.string("name").notNullable();
      table.date('date_of_clean_up').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('country').notNullable();
      table.specificType('long_map_value', 'double precision').notNullable();
      table.specificType('lat_map_value', 'double precision').notNullable();
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('clean_ups');
  };
