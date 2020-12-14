const Booru = require('booru')
const { BooruError } = require('booru')

module.exports = {
  name: 'booru',
  description: 'search image in booru',
  execute (message, targetCh, tags, client, sauce = 'safe') {
    let rating = null
    switch (sauce) {
      case 'safe':
        rating = 'rating:safe'
        break
      case 'lewd':
        rating = 'rating:explicit'
        break
      default:
        rating = 'rating:safe'
    }

    Booru.search(
      'danbooru',
      [tags, rating],
      {
        limit: 1,
        random: true
      })
      .then(posts => {
        for (const post of posts) {
          const toSend = {
            embed: {
              image: {
                url: post.fileUrl
              },
              fields: [
                { name: 'Rating', value: post.rating, inline: true },
                { name: 'Post', value: post.postView },
                { name: 'Sauce : ', value: post.source != null ? post.source : 'Sauce di Post' }
              ]
            }
          }

          // const embed = new Discord.MessageEmbed()
          //     .setImage(post.fileUrl)
          //     .addFields(
          //         { name: 'Rating : ', value: post.rating, inline: true},
          //         { name: 'Post : ', value: post.postView },
          //         { name: 'Sauce : ', value: post.source!=null ? post.source : 'Sauce di Post' }
          //     )

          if (targetCh && client) {
            const ch = client.channels.cache.get(targetCh)
            ch.send(toSend)
          } else {
            message.channel.send(toSend)
          }
        }
      })
      .catch(err => {
        if (err instanceof BooruError) {
          console.error(err.message)
        } else {
          console.error(err)
        }
        message.channel.send('Can\'t find any image :(')
      })
  }
}
