const cron = require('node-cron')
const usersExtractor = require('./usersExtractor')
const { TZ } = require('../config/config')

module.exports = function (data, client) {
  data.forEach((row, index) => {
    const users = usersExtractor(row.users)

    cron.schedule(
      row.crontime,
      function () {
        let message = `Saatnya ${row.course}`

        if (row.course === 'TA' || row.course === 'Pra-TA') message = `Saatnya mengerjakan ${row.course}`

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
