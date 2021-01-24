const { PREFIX } = require('../config/config')
const { addBooru } = require('../db/autoboorudb')
const { getChannel, scheduleBooru } = require('../utils')
const booru = require('./booru/booru')

const usage = 'booru'

module.exports = {
  name: 'Booru Image Search',
  usage: usage,
  description: `Search image from booru sites
                    **${PREFIX}${usage} [booru_tag] <lewd/safe>** 
                    **${PREFIX}${usage} [booru_tag] <lewd/safe> [channel] auto**`,
  execute (message, options, client) {
    let tags = options[0]
    let rating = options[1]
    let targetCh = null

    if (tags === 'safe' || tags === 'lewd') {
      rating = tags
      tags = ''
    }

    if (!options[2]) targetCh = message.channel.id
    else targetCh = options[2].startsWith('<#') ? getChannel(options[2]) : message.channel.id

    const server = message.guild.id

    if (options.includes('auto')) {
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
      booru(message, targetCh, tags, client, rating)
    }
  }
}
