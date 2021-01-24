const getUserFromMention = require('../utils/getUserFromMention')

module.exports = {
  name: 'Avatar',
  usage: 'ava',
  description: 'Show user avatar \n**~ava <tag_user>**',
  execute (message, options, client) {
    if (options.length > 0) {
      options.forEach(mentioned => {
        const user = client.users.cache.get(getUserFromMention(mentioned))
        if (!user) {
          return message.reply('Not a Valid User')
        }
        return message.reply({
          files: [user.avatarURL({ format: 'png', dynamic: true, size: 1024 })]
        })
      })
    } else {
      return message.reply({
        files: [message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })]
      })
    }
  }
}
