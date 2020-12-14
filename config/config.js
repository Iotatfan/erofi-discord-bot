require('dotenv').config()

const PREFIX = process.env.PREFIX
const TOKEN = process.env.TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const TZ = process.env.TZ

exports.PREFIX = PREFIX
exports.TOKEN = TOKEN
exports.DATABASE_URL = DATABASE_URL
exports.TZ = TZ
