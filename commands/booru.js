const { PREFIX } = require('../config/config')
const { addBooru } = require('../db/autoboorudb')
const { getChannel, scheduleBooru } = require('../utils')
const booru = require('./booru/booru')

const usage = 'booru'

module.exports = {
  name: 'Booru Image Search',
  usage: 'booru',
  description: `Search image from booru sites
                    **${PREFIX}${usage} [booru_tag] <lewd/safe>** 
                    **${PREFIX}${usage} auto [booru_tag] [channel] <lewd/safe>**`,
  execute (message, options, client) {
    const tags = options[0]
    let targetCh = null

    if (!options[2]) targetCh = message.channel.id
    else targetCh = options[2].startsWith('<#') ? getChannel(options[2]) : message.channel.id

    const server = message.guild.id

    let rating = options[3] != null ? options[3] : 'safe'

    if (options[1] === 'auto') {
      const values = [targetCh, tags, server, rating]
      addBooru(values, (err, res) => {
        if (err) {
          console.log(err)
          message.channel.send('Searching images failed succesfully :(')
        } else {
          const data = res.rows
          scheduleBooru(message, data, client, rating)
          message.channel.send('Added to List')
        }
      })
    } else {
      rating = options[1]
      booru(message, targetCh, tags, client, rating)
    }
  }
}
