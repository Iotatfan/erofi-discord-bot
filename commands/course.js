
const { addCourse, listCourse } = require('./course/')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'course',
    description: 'course reminder',
    execute(message, options, client) {
        const subCommand = options[0]

        // move schedule, list, add to course forlder

        let server = message.guild.id
        console.log(server)
        
        if (options[0] == 'list') {
            listCourse.execute(message, server)
            
        } else {
            addCourse.execute(message, options, client, server)
        }
    }
}