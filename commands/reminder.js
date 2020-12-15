const { PREFIX } = require('../config/config')
const { addReminder, listReminder } = require('./reminder/')

const usage = 'remind'

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
  name: 'Bot Reminder',
  usage: usage,
  description: `Let the bot remind you
                    **${PREFIX}${usage} list**
                    **${PREFIX}${usage} [message] <day> <time> [tag_channel] <tag_user>**`,
  execute (message, options, client) {
    const subCommand = options[0]

    const server = message.guild.id

    if (subCommand === 'list') {
      listReminder(message, server)
    } else {
      addReminder(message, options, client, server)
    }
  }
}
