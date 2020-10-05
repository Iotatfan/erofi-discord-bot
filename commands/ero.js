const { addBooru } = require('../db/autoboorudb')
const { scheduleBooru } = require('../utils/')
const booru = require('./booru/booru')

module.exports = {
    name: 'ero',
    description: 'unrestricted search',
    execute(message, options, client) {
        // console.log(message)
        const tags = options[0]
        
        if (!options[2]) targetCh = message.channel.id
        else targetCh = options[2].startsWith('<#') ? getChannel.execute(options[2]) : message.channel.id

        const server = message.guild.id
        const values = [targetCh, tags, server]

        if (options[1] == 'auto') {
            if (options[0] == 'auto') {
                addBooru(values, (err, res) => {
                    if (err) console.log(err)
                    else {
                        const data = res.rows
                        scheduleBooru.execute(message, data, client, 'danbooru')
                    }
                })
            }
        } else {
            booru.execute(message, tags, targetCh, client, 'danbooru')
        }
    }
}