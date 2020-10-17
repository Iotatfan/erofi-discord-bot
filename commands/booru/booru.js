const Discord = require('discord.js')
const Booru = require('booru')

module.exports = {
    name: 'booru',
    description: 'search image in booru',
    execute(message, tags, targetCh, client, site = 'safebooru') {
        console.log(targetCh)
        Booru.search(
            site,
            [tags],
            {
                limit: 1,
                random: true
            })
            .then(posts => {
                for (let post of posts) {

                    const embed = new Discord.MessageEmbed()
                        .setImage(post.fileUrl)
                        .addFields(
                            { name: 'Rating : ', value: post.rating, inline: true},
                            { name: 'Post : ', value: post.postView },
                            { name: 'Sauce : ', value: post.source!=null ? post.source : 'Sauce di Post' }
                        )
                    if (targetCh && client) {
                        // const attachment = new Discord.MessageAttachment(post.fileUrl)
                        const ch = client.channels.cache.get(targetCh)
                        ch.send(embed)
                    } else {
                        // const attachment = new Discord.MessageAttachment(post.fileUrl)
                        message.channel.send(embed)
                    }
                }
            })
            .catch ( err => {
                if (err instanceof BooruError) {
                    console.error(err.message)
                } else {
                    console.error(err)
                }
                message.channel.send('Ga ketemu :(')
            })
    }
}