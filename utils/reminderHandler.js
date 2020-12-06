const getChannel = require('./getChannel')
const dayOfWeek = [
    'sunday', 'monday', 'tuesday', 'wednesday', 
    'thursday', 'frinday', 'saturday'
]

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'remindertringHandler',
    execute(args) {

        // Get Class Name
        var courseName = args[0]

        // Format time to Cron
        var day = '*'

        dayOfWeek.forEach( (dayInWeek, index) => {
            if (args[1].toLowerCase() == dayInWeek || args[1] == index) {
                day = index
            } 
        })

        var cronTime = `0 * * * ${day}`

        // Get Channel & User
        var channel = null
        var users = []
        args.forEach( content => {
            if (content.includes(':')) {
                var time = content.split(':')
                cronTime = `${time[1]} ${time[0]} * * ${day}`
            } else if (content.startsWith('<#')) {
                channel = getChannel.execute(content)
            } else if (content.startsWith('<@')) {
                users.push(content)
                // Refactor this
            }
        })

        return { courseName, cronTime, channel, users }
    }
}