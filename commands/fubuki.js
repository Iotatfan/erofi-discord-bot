const runCron = require('../utils/scheduleBooru')
const { getChannel } = require('../utils/')
const booru = require('./booru/booru')
let tags = 'shirakami_fubuki' 
var targetCh = ''

module.exports = {
    name: 'fubuki',
    description: 'send fubuki image',
    execute(message, options, client) {
        // console.log(message)
        if (!options[1]) targetCh = message.channel.id
        else targetCh = options[1].startsWith('<#') ? getChannel.execute(options[1]) : message.channel.id

        if (options[0] == 'auto') {
            runCron.execute(message, tags, targetCh, client)
        } else {
            booru.execute(message, tags, targetCh, client)
        }
    }
}