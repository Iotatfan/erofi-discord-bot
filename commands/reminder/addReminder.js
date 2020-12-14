const { addReminder } = require('../../db/reminderdb')
const { reminderHandler, scheduleReminder } = require('../../utils')

module.exports = {
  name: 'add reminder',
  execute (message, options, client, server) {
    const { remindMessage, cronTime, channel, users } = reminderHandler.execute(options)

    // TO DO Better String Handler
    // TO DO Day-Time Converter to CRON Format
    const values = [remindMessage, cronTime, channel, users, server]

    addReminder(values, (err, res) => {
      if (err) {
        console.log(err)
        return message.channel.ssend('Gagal Menambahkan Reminder')
      } else {
        const data = res.rows
        scheduleReminder.execute(data, client)
        message.channel.send('Reminder Berhasil Ditambahkan')
      }
    })
  }
}
