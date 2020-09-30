const Discord = require('discord.js')
const Booru = require('booru')

module.exports = {
    name: 'ero',
    description: 'unrestricted search',
    execute(message, options) {
        // console.log(message)
        Booru.search(
            'danbooru',
            [options[0]],
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