const knex = require('knex')
const config = require('../knexFile')

const environment = process.env.DB_ENV || 'development';
module.exports = knex(config[environment])