const cron = require('node-cron')
const usersExtractor = require('./usersExtractor')

module.exports = {
    name: 'schedule reminder',
    execute(data, client) {
        data.forEach( (row, index) => {
            console.log('Schedule')
            console.log(row)
            const users = usersExtractor.execute(row.users)
            // console.log('User : ' + users)

            cron.schedule(
                row.crontime, 
                function() {
                    let message = `Saatnya ${row.course}`

                    if (row.course == 'TA' || row.course == 'Pra-TA') message = `Saatnya mengerjakan ${row.course}`
                    
                    if (users) message = `${message} ${users}`

                    console.log(message)
                    
                    const ch = client.channels.cache.get(row.channel)
                    ch.send(message)
            }, 
            {
                scheduled: true,
                timezone: 'Asia/Jakarta'
            })
        })
    }
}