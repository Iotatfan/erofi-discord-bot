const { addBooru } = require('../db/autoboorudb')
const { getChannel, scheduleBooru } = require('../utils/')
const booru = require('./booru/booru')
let tags = 'gawr_gura'
var targetCh = ''

module.exports = {
    name: 'gura',
    description: 'send gura image',
    execute(message, options, client) {
        if (!options[1]) targetCh = message.channel.id
        else targetCh = options[1].startsWith('<#') ? getChannel.execute(options[1]): message.channel.id

        const server = message.guild.id
        const values = [targetCh, tags, server]

        if (options[0] == 'auto') {
            addBooru(values, (err, res) => {
                if (err) console.log(err)
                else {
                    const data = res.rows
                    scheduleBooru.execute(message, data, client)
                }
            })
        } else {
            booru.execute(message, tags, targetCh, client)
        }
    }
}