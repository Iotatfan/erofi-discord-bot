const cronstrue = require('cronstrue')
const { listReminder } = require('../../db/reminderdb')

module.exports = {
  name: 'list reminder',
  execute (message, server) {
    listReminder(server, (err, res) => {
      if (err) {
        console.log(err)
      }

      const toSend = {
        embed: {
          title: 'List of Reminder in This Server',
          color: '00FF00',
          fields: []
        }
      }

      const data = res.rows

      data.forEach((row, index) => {
        const time = cronstrue.toString(row.crontime)
        toSend.embed.fields.push({
          name: `${index + 1}. ${row.course}`,
          value: `${time}`
        })
      })

      console.log(toSend)
      return message.channel.send(toSend)
    })
  }
}
