
const { addReminder, listReminder } = require('./reminder/')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'reminder',
    description: 'Reminder',
    execute(message, options, client) {
        const subCommand = options[0]

        // move schedule, list, add to course forlder

        let server = message.guild.id
        console.log(server)
        
        if (options[0] == 'list') {
            listReminder.execute(message, server)
            
        } else {
            addReminder.execute(message, options, client, server)
        }
    }
}