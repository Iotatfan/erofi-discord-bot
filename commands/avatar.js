const Discord = require('discord.js')
const getUserFromMention = require('../utils/getUserFromMention')

module.exports = {
  name: 'Avatar',
  usage: 'ava',
  description: 'Show user avatar \n**~ava <tag_user>**',
  execute (message, options, client) {
    let attachment = null
    if (options.length > 0) {
      options.forEach(mentioned => {
        const user = client.users.cache.get(getUserFromMention(mentioned))
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
