const runCron = require('../utils/scheduleBooru')
const { getChannel } = require('../utils/')
const booru = require('./booru/booru')
let tags = 'gawr_gura'
var targetCh = ''

module.exports = {
    name: 'gura',
    description: 'send gura image',
    execute(message, options, client) {
        if (!options[1]) targetCh = message.channel.id
        else targetCh = options[1].startsWith('<#') ? getChannel.execute(options[1]): message.channel.id

        if (options[0] == 'auto') {
            runCron.execute(message, tags, targetCh, client)
        } else {
            booru.execute(message, tags, targetCh, client)
        }
    }
}