const Booru = require('booru')

module.exports = async (message, targetCh, tags, client, rating = 'safe') => {
  switch (rating) {
    case 'safe':
      rating = 'rating:safe'
      break
    case 'lewd':
      rating = 'rating:explicit'
      break
    default:
      rating = 'rating:safe'
  }

  try {
    const searchResult = await Booru.search(
      'danbooru',
      [tags, rating],
      {
        limit: 1,
        random: true
      })

    if (searchResult.posts.length < 1) return message.reply('Please make sure you the tag is correct')
    else {
      searchResult.forEach(post => {
        const toSend = {
          embed: {
            image: {
              url: post.fileUrl
            },
            fields: [
              { name: 'Rating', value: post.rating, inline: true },
              { name: 'Post', value: post.postView },
              { name: 'rating : ', value: post.source != null ? post.source : 'rating di Post' }
            ]
          }
        }
        if (targetCh && client) {
          const ch = client.channels.cache.get(targetCh)
          ch.send(toSend)
        } else {
          message.channel.send(toSend)
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
}
