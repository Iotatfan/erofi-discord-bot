const db = require('./index')

module.exports = {
    cronBooru: (callback) => {
        const text = 'select * from autobooru'

        return db.query(text, null, callback)
    },
    addBooru(params, callback) {
        const text = 'insert into autobooru(channel, tag, server, source) values($1, $2, $3, $4) returning *'
        
        return db.query(text, params, callback)
    },
    listBooru: (params, callback) => {
        const text = 'select * from auto where id = $1'

        return db.query(text, params, callback)
    }
}