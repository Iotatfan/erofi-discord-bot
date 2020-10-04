const cron = require('node-cron')
const courseUsersExtractor = require('./courseUsersExtractor')

module.exports = {
    name: 'schedule course',
    execute(data, client) {
        data.forEach( (row, index) => {
            console.log('Schedule')
            console.log(row)
            const users = courseUsersExtractor.execute(row.users)

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