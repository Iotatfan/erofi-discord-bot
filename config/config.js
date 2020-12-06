require('dotenv').config()

let PREFIX = process.env.PREFIX
let TOKEN = process.env.TOKEN 
let DATABASE_URL = process.env.DATABASE_URL
let TZ = process.env.TZ

exports.PREFIX = PREFIX
exports.TOKEN = TOKEN
exports.DATABASE_URL = DATABASE_URL
exports.TZ = TZ