const Discord = require('discord.js')
const Booru = require('booru')

module.exports = {
    name: 'fubuki',
    description: 'send fubuki image',
    execute(message) {
        // console.log(message)
        Booru.search(
            'safebooru',
            ['shirakami_fubuki'],
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
            })
    }
}