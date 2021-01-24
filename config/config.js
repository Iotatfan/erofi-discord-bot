require('dotenv').config()

const PREFIX = process.env.PREFIX
const TOKEN = process.env.TOKEN
const DATABASE_URL = process.env.DATABASE_URL
const TZ = process.env.TZ
const APP_ID = process.env.APP_ID
const PUBLIC_KEY = process.env.PUBLIC_KEY

exports.PREFIX = PREFIX
exports.TOKEN = TOKEN
exports.DATABASE_URL = DATABASE_URL
exports.TZ = TZ
exports.APP_ID = APP_ID
exports.PUBLIC_KEY = PUBLIC_KEY
