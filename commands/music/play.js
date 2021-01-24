const Discord = require('discord.js')
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const ytsr = require('ytsr')
const queue = new Map()
let queueConstruct = null

module.exports = {
  name: 'play',
  async check (voiceChannel, message, query) {
    const serverQueue = queue.get(message.guild.id)

    if (!serverQueue) {
      queueConstruct = {
        songs: [],
        volume: 5,
        playing: false,
        vc: voiceChannel,
        connection: null
      }
      queue.set(message.guild.id, queueConstruct)
    }

    switch (query) {
      case 'stop':
        this.stop(message)
        break
      case 'skip':
        this.skip(message)
        break
      case 'shuffle':
        this.shuffle(message)
        break
      case 'list':
        this.list(message)
        break
      default:
        if (ytdl.validateURL(query)) this.parseVideo(query, message)
        else if (ytpl.validateID(query)) this.parsePlaylist(query, message)
        else this.search(query, message)
    }
  },
  async parseVideo (url, message) {
    const songInfo = await ytdl.getInfo(url)

    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      thumbnail: songInfo.videoDetails.thumbnail.thumbnails[0].url
    }

    this.queue(song, message)
    message.channel.send(`Added to queue : **${song.title}**`)
  },
  async parsePlaylist (url, message) {
    const playlistID = await ytpl.getPlaylistID(url)
    const playlist = await ytpl(playlistID)
    playlist.items.forEach(video => {
      const song = {
        title: video.title,
        url: video.url,
        thumbnail: video.bestThumbnail.url
      }
      this.queue(song, message)
    })
    message.channel.send('Playlist added to queue')
  },
  async search (text, message) {
    const filters1 = await ytsr.getFilters(text)
    const filter1 = filters1.get('Type').get('Video')
    const options = {
      limit: 1
    }
    const searchResults = (await ytsr(filter1.url, options)).items

    // console.log(searchResults)

    const song = {
      title: searchResults[0].title,
      url: searchResults[0].url,
      thumbnail: searchResults[0].bestThumbnail.url
    }
    this.queue(song, message)
    message.channel.send(`Added to queue : **${song.title}**`)
  },
  async queue (song, message) {
    const serverQueue = queue.get(message.guild.id)

    serverQueue.songs.push(song)
    if (!serverQueue.playing) {
      serverQueue.playing = true

      serverQueue.vc.join()
        .then(conn => {
          serverQueue.connection = conn
          this.play(serverQueue.songs[0], message)
        })
    }
  },
  play (song, message) {
    const serverQueue = queue.get(message.guild.id)

    if (!song) {
      serverQueue.vc.leave()
      queue.delete(message.guild.id)
      return
    }

    serverQueue.connection
      .play(ytdl(song.url, {
        filter: 'audio',
        highWaterMark: 1 << 25
      }))
      .on('finish', () => {
        serverQueue.songs.shift()
        this.play(serverQueue.songs[0], message)
      })
      .on('error', err => {
        console.log(err)
        message.channel.send('```' + err + '```')

        if (err.code === 'EPIPE') return this.play(serverQueue.songs[0], message)

        this.play(serverQueue.songs[0], message)
      })

    const toSend = {
      embed: {
        color: '00FF00',
        title: `Playing: **${song.title}**`,
        url: song.url,
        thumbnail: {
          url: song.thumbnail
        }
      }
    }

    message.channel.send(toSend)
  },
  skip (message) {
    const serverQueue = queue.get(message.guild.id)
    console.log('Skipping song')
    serverQueue.connection.dispatcher.end()
  },
  shuffle (message) {
    const serverQueue = queue.get(message.guild.id)
    const { songs } = serverQueue

    if (songs.length < 3) return
    // console.log(songs.length)
    // console.log('Shuffling queue')
    message.channel.send('Shuffling queue')

    for (let i = songs.length - 1; i > 1; --i) {
      const j = Math.ceil(Math.random() * i)
      const temp = songs[i]
      songs[i] = songs[j]
      songs[j] = temp
    }
  },
  list (message) {
    const serverQueue = queue.get(message.guild.id)
    const { songs } = serverQueue

    const embed = new Discord.MessageEmbed()
      .setColor('00FF00')
      .setTitle('Now Playing')
      .setThumbnail(songs[0].thumbnail)
      .setURL(songs[0].url)
      .setDescription(`${songs[0].title}`)
      .addFields(
        { name: '\u200B', value: '\u200B', inline: false },
        { name: 'Up Next', value: '\u200B', inline: false }
      )
    let length = songs.length
    if (length > 11) length = 11
    if (length > 1) {
      for (let i = 1; i < length; i++) {
        embed.addField(`${i}.  ${songs[i].title}`, '\u200B', false)
      }
    }
    message.channel.send(embed)
  },
  stop (message) {
    const serverQueue = queue.get(message.guild.id)

    console.log('Stopping Music')
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
  },
  serverQueue: this.serverQueue
}
