const cron = require('node-cron')
const booru = require('../commands/booru/booru')
const { TZ } = require('../config/config')

module.exports = function (message, data, client, rating) {
  data.forEach((row, index) => {
    cron.schedule(
      '0 6-20/2 * * *', // Change it to dynamic later
      function () {
        booru(message, row.channel, row.tag, client, rating)
      },
      {
        scheduled: true,
        timezone: TZ
      })
  })
}
