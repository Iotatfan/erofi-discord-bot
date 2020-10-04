const booru = require('./booru/booru')
const runCron = require('../utils/scheduleBooru')

module.exports = {
    name: 'ero',
    description: 'unrestricted search',
    execute(message, options, client) {
        // console.log(message)
        const tags = options[0]
        
        if (!options[2]) targetCh = message.channel.id
        else targetCh = options[2].startsWith('<#') ? getChannel.execute(options[2]) : message.channel.id

        if (options[1] == 'auto') {
            runCron.execute(message, tags, targetCh, client, 'danboooru')
        } else {
            booru.execute(message, tags, targetCh, client, 'danbooru')
        }
    }
}