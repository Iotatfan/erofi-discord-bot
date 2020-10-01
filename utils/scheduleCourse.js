const cron = require('node-cron')
const usersExtract = require('../utils/courseUsersExtractor')

module.exports = {
    name: 'scheduleCourse',
    execute(data, client) {
        data.forEach( (row, index) => {
            console.log(row)
            const users = usersExtract.execute(row.users)

            cron.schedule(
                row.crontime, 
                function() {
                    const ch = client.channels.cache.get(row.channel)
                    ch.send('Saatnya kelas ' + row.course + ` ${users} `)
            }, 
            {
                scheduled: true,
                timezone: 'Asia/Jakarta'
            })
        })
    }
}