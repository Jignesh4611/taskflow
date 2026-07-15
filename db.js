const {Pool} = require("pg")

const pool = new Pool({
    host : process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    port : process.env.DB_PORT, 
    user : process.env.DB_USER,
    ssl: {
    rejectUnauthorized: false,
  },

})

module.exports =pool;