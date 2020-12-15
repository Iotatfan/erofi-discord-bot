const getChannel = require('./getChannel')
const dayOfWeek = [
  'sunday', 'monday', 'tuesday', 'wednesday',
  'thursday', 'frinday', 'saturday'
]

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = function (args) {
  // Get Class Name
  const courseName = args[0]

  // Format time to Cron
  let day = '*'

  dayOfWeek.forEach((dayInWeek, index) => {
    if (args[1].toLowerCase() === dayInWeek || args[1] === index) {
      day = index
    }
  })

  let cronTime = `0 * * * ${day}`

  // Get Channel & User
  let channel = null
  const users = []
  args.forEach(content => {
    if (content.includes(':')) {
      const time = content.split(':')
      cronTime = `${time[1]} ${time[0]} * * ${day}`
    } else if (content.startsWith('<#')) {
      channel = getChannel(content)
    } else if (content.startsWith('<@')) {
      users.push(content)
      // Refactor this
    }
  })

  return { courseName, cronTime, channel, users }
}
