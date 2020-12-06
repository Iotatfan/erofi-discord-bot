const { PREFIX } = require('../config/config')
const { addBooru } = require('../db/autoboorudb')
const { getChannel, scheduleBooru } = require('../utils')
const booru = require('./booru/booru')

const usage = 'booru'

module.exports = {
    name: 'Booru Image Search',
    usage: booru,
    description: `Search image from booru sites \n **${PREFIX}${usage} [booru_tag] <lewd/safe>** \n **${PREFIX}${usage} auto [booru_tag] [channel] <lewd/safe>**`,
    execute(message, options, client) {
        console.log('Params ' + options)
        // Refactor Later
        const tags = options[0]
        
        if (!options[2]) targetCh = message.channel.id
        else targetCh = options[2].startsWith('<#') ? getChannel.execute(options[2]) : message.channel.id

        const server = message.guild.id
        
        let sauce = options[3]!=null ? options[3] : 'safe'
        
        console.log(sauce)
        
        const values = [targetCh, tags, server, sauce]

        if (options[1] == 'auto') {
            addBooru(values, (err, res) => {
                if (err) {
                    console.log(err)
                    message.channel.send('Searching images failed succesfully :(')
                }
                else {
                    const data = res.rows
                    scheduleBooru.execute(message, data, client, sauce)
                    message.channel.send('Added to List')
                }
            })
        } else {
            sauce = options[1]
            booru.execute(message, tags, targetCh, client, sauce)
        }
    }
}