const cron = require('node-cron')
const usersExtractor = require('./usersExtractor')
const { TZ } = require('../config/config')

module.exports = function (data, client) {
  data.forEach((row, index) => {
    const users = usersExtractor(row.users)

    cron.schedule(
      row.crontime,
      function () {
        let message = `${row.course}`

        if (users) message = `${message} ${users}`

        const ch = client.channels.cache.get(row.channel)
        ch.send(message)
      },
      {
        scheduled: true,
        timezone: TZ
      })
  })
}
