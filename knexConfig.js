const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('./knexfile')[env]);
module.exports = knex;