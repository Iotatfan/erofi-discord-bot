const Discord = require('discord.js')
const utils = require('../utilis/extratcUser')

module.exports = {
    name: 'ava',
    description: 'show user avatar',
    execute(message, options, client) {
        console.log('Users Collection = ' + options)
        if (options != '') {
            options.forEach(mentioned => {
                console.log('Mentioned = ' + mentioned)
                const user = utils.execute(mentioned, client)
                if (!user) {
                    return message.reply('Not a Valid User')
                }
                attachment = new Discord.MessageAttachment(user.displayAvatarURL())
                return message.reply(attachment)
            })
        } else {
            attachment = new Discord.MessageAttachment(message.author.displayAvatarURL())
            return message.reply(attachment)
        }
    }
}