const db = require('./index')

module.exports = {
    cronReminder: (callback) => {
        const text = 'select * from courses'

        return db.query(text, null, callback)
    },
    listReminder: (server, callback) => {
        const text = `select * from courses where server = $1`

        return db.query(text, [server], callback)
    },
    addReminder(params, callback) {
        const text = 'insert into courses(course, crontime, channel, users, server) values($1, $2, $3, $4, $5) returning *'
        
        return db.query(text, params, callback)
    }
}