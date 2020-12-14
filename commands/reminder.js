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
    execute(message, options, client) {
        const subCommand = options[0]

        // move schedule, list, add to course forlder

        let server = message.guild.id
        // console.log(server)
        
        if (options[0] == 'list') {
            listReminder.execute(message, server)
            
        } else {
            addReminder.execute(message, options, client, server)
        }
    }
}