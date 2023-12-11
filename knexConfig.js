
/** knex config for hosted services */ 
/**------------------------------------- */
/** 
const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('./knexfile')[env]);
module.exports = knex;
*/


/** knex.js for local host */ 
/**------------------------------------- */ 
const knex = require('knex')(require('./knexfile'));

module.exports = knex;