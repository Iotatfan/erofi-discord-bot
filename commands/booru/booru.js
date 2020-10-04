const Discord = require('discord.js')
const Booru = require('booru')

module.exports = {
    name: 'booru',
    description: 'search image in booru',
    execute(message, tags, targetCh, client, site = 'safebooru') {
        // console.log(message)
        Booru.search(
            site,
            [tags],
            {
                limit: 1,
                random: true
            })
            .then(posts => {
                for (let post of posts) {
                    if (!targetCh && !client) {
                        const attachment = new Discord.MessageAttachment(post.fileUrl)
                        const ch = client.channels.cache.get(targetCh)
                        ch.send(attachment)
                    } else {
                        const attachment = new Discord.MessageAttachment(post.fileUrl)
                        message.channel.send(attachment)
                    }
                }
            })
            .catch ( err => {
                console.log(err)
                message.channel.send('Ga ketemu :(')
            })
    }
}