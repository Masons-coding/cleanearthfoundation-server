require("dotenv").config();

const {
  DB_CONNECTION
} = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql",
  connection: {
    DB_CONNECTION
  }
};