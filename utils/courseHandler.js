const getChannel = require('../utils/getChannel')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'courseStringHandler',
    execute(args) {
        const dayOfWeek = [
            'sunday', 'monday', 'tuesday', 'wednesday', 
            'thursday', 'frinday', 'saturfay'
        ]
        console.log(args)

        // Get Class Name
        var courseName = args[0]

        // Format time to Cron
        var day = null

        dayOfWeek.forEach( (dayInWeek, index) => {
            if (args[1].toLowerCase() == dayInWeek || args[1] == index) {
                day = index
            }
        })

        var time = args[2].includes(':') ? args[2] : null
        time = time.split(':')
        let cronTime = `${time[1]} ${time[0]} * * ${day}`

        // Get Channel & User
        var channel = null
        var users = []
        args.forEach( content => {
            // console.log(content)
            if (content.startsWith('<#')) {
                channel = getChannel.execute(content)
            } else if (content.startsWith('<@')) {
                users.push(content)
            }
        })

        return { courseName, cronTime, channel, users }
    }
}