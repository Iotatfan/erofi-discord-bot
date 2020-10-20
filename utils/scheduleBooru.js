const cron = require('node-cron')
const booru = require('../commands/booru/booru')

module.exports = {
    name: 'scheduleBooru',
    execute(message, data, client, sauce) {  

        data.forEach( (row, index) => {
            console.log(row)
            
            site = row.source!=null ? row.source : sauce

            cron.schedule(
                '0 6-20 * * *',         // Change it to dynamic later
                function() {
                    booru.execute(message, row.tag, row.channel, client, sauce)
                }, 
                {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
        })

    }
}