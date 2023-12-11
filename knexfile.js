
/** knex.js for hosted services */ 
/**------------------------------------- */

/*
require("dotenv").config();
 module.exports = {
  production: {
    client: 'mysql2',
    connection: {
      host : process.env.JAWSDB_URL,
      user : process.env.JAWSDB_USER,
      password : process.env.JAWSDB_PASSWORD,
      database : process.env.JAWSDB_DB
    }
  }
};
*/


/** knex.js for local host */ 
/**------------------------------------- */ 
require("dotenv").config();

const {
  DB_LOCAL_USER,
  DB_LOCAL_PASSWORD,
  DB_LOCAL_DBNAME
} = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: DB_LOCAL_USER,
    password: DB_LOCAL_PASSWORD,
    database: DB_LOCAL_DBNAME,
    charset: "utf8",
  }
};