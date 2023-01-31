require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.JAWSDB_URL,
      user : process.env.JAWSDB_USER,
      password : process.env.JAWSDB_PASSWORD,
      database : process.env.JAWSDB_DB
    }
  }
};