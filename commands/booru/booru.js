const Booru = require('booru')
const pxBaseLink = 'https://www.pixiv.net/en/artworks/'

module.exports = async (message, targetCh, tags, client, rating) => {
  switch (rating) {
    case 'safe':
      rating = 'rating:safe'
      break
    case 'lewd':
      rating = 'rating:explicit'
      break
    default:
      rating = ''
  }
  if (tags === '') {
    tags = rating
    rating = ''
  }

  try {
    const searchResult = await Booru.search(
      'danbooru',
      [tags, rating],
      {
        limit: 1,
        random: true
      })

    if (searchResult.posts.length < 1) {
      // console.log(searchResult)
      return message.channel.send('No result found, please make sure the tag is correct')
    } else {
      let source = null
      if (searchResult[0].source) {
        if (searchResult[0].source.includes('pximg')) {
          const str = searchResult[0].source.split('/').pop().toString().split('_')
          source = pxBaseLink + str[0]
        } else {
          source = searchResult[0].source
        }
      }

      const toSend = {
        embed: {
          image: {
            url: searchResult[0].file_url
          },
          fields: [
            { name: 'Rating', value: searchResult[0].rating, inline: true },
            { name: 'Booru Post', value: searchResult[0].postView },
            { name: 'Source : ', value: source != null ? source : 'Source di Post' }
          ]
        }
      }
      if (targetCh && client) {
        const ch = client.channels.cache.get(targetCh)
        ch.send(toSend)
      } else {
        message.channel.send(toSend)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
