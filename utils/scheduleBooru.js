const cron = require('node-cron')
const booru = require('../commands/booru/booru')

module.exports = {
    name: 'scheduleBooru',
    execute(message, tags, targetCh, client) {  
        console.log(targetCh)

        cron.schedule(
            '0 * * * *',         // Change it to dynamic later
            function() {
                booru.execute(message, tags, targetCh, client)
            }, 
            {
                scheduled: true,
                timezone: 'Asia/Jakarta'
            })
    }
}