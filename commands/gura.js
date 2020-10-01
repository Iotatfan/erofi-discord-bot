const Discord = require('discord.js')
const Booru = require('booru')
const runCron = require('../utils/scheduleBooru')
const getChannel = require('../utils/getChannel')
let tag = 'gawr_gura'
var channel = ''

module.exports = {
    name: 'gura',
    description: 'send gura image',
    execute(message, options, client) {
        if (!options[1]) channel = message.channel.id
        else channel = options[1].startsWith('<#') ? getChannel.execute(options[1]): message.channel.id

        if (options[0] == 'auto') {
            runCron.execute(tag, channel, client)
        } else {
            Booru.search(
                'safebooru',
                [tag],
                {
                    limit: 1,
                    random: true
                })
                .then(posts => {
                    for (let post of posts) {
                        const attachment = new Discord.MessageAttachment(post.fileUrl)
                        message.channel.send(attachment)
                    }
                })
                .catch ( err => {
                    console.log(err)
                    message.channel.send('Ga ketemu :(')
                })
        }
    }
}