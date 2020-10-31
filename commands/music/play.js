const Discord = require('discord.js')
const ytdl = require("ytdl-core");
const ytpl = require("ytpl")
const queue = new Map()
let queueConstruct = null

// Refactor Later

module.exports = {
    name: 'play',
    async check(voiceChannel, message, subCommand) {
        const serverQueue = queue.get(message.guild.id);

        if (!serverQueue) {
            queueConstruct = {
                songs: [],
                volume: 5,
                playing: false,
                vc: voiceChannel,
                connection: null
            }
        }
        queue.set(message.guild.id, queueConstruct)

        switch(subCommand) {
            case 'stop':
                this.stop(serverQueue)
                break
            case 'skip':
                this.skip(serverQueue)
                break
            case 'shuffle':
                this.shuffle(serverQueue, message)
                break
            case 'list':
                this.list(serverQueue, message)
                break
            default:
                if (ytdl.validateURL(subCommand)) this.parseVideo(subCommand, message)
                else if (ytpl.validateID(subCommand)) this.parsePlaylist(subCommand, message)
                else message.channel.send('Command music apaan itu')
        }
        
    },
    async parseVideo(url, message) {
        console.log('Parse Video')
        const songInfo = await ytdl.getInfo(url)

        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            thumbnail: songInfo.videoDetails.thumbnail.thumbnails[0].url
        }
        this.queue(song, message)
        message.channel.send(`Added to queueu : **${song.title}**`)
        
    },
    async parsePlaylist(url, message) {
        console.log('Parse Playlist')
        ytpl.getPlaylistID(url).then(playlistID => {
            console.log(playlistID)
            ytpl(playlistID).then(playlist => {
                playlist.items.forEach( video => {
                    // console.log(video)
                    const song = {
                        title: video.title,
                        url: video.url_simple,
                        thumbnail: video.thumbnail
                    }
                    this.queue(song, message)
                })
                message.channel.send(`Playlist added to queue`)
            })
        })
    },
    async queue(song, message) {
        // console.log('Added to queue')
        const serverQueue = queue.get(message.guild.id) 
        
        serverQueue.songs.push(song)
        if (!serverQueue.playing) {
            serverQueue.playing = true

            serverQueue.vc.join()
                .then(conn => {
                    serverQueue.connection = conn
                    this.play(serverQueue.songs[0], message)
                })

            // let connection = serverQueue.vc.join()
        }
    },
    play(song, message) {
        const serverQueue = queue.get(message.guild.id) 
        // console.log(serverQueue.connection)
           
        if (!song) {
            serverQueue.vc.leave()
            queue.delete(message.guild.id)
            return
        } 

        console.log(song)

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url, {
                filter: "audio",
                highWaterMark: 1 << 25
            }))
            .on('finish', () => {
                console.log('Playing music')
                serverQueue.songs.shift()
                this.play(serverQueue.songs[0], message)
            })
            .on('error', err => {
                console.log(err)
                message.channel.send('```' + err + '```')
                
                if (err.code == 'EPIPE') return this.play(serverQueue.songs[0], message)

                this.skip(serverQueue)
            })
        message.channel.send(`Playing : **${song.title}**`)
    },
    skip(serverQueue) {
        console.log('Skipping song')
        serverQueue.connection.dispatcher.end()
    },
    shuffle(serverQueue, message) {
        // const serverQueue = queue.get(message.guild.id) 
        if (serverQueue.songs.length < 3) return
        console.log(serverQueue.songs.length)
        console.log('Shuffling queue')
        message.channel.send('Shuffling queue')

        for(let i = serverQueue.songs.length - 1; i > 1; --i) {
            const j = Math.ceil(Math.random() * i)
            const temp = serverQueue.songs[i]
            serverQueue.songs[i] = serverQueue.songs[j]
            serverQueue.songs[j] = temp
        }
        // console.log(serverQueue.songs[1])
    },
    list(serverQueue, message) {
        console.log(serverQueue.songs[0])
        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Now Playing')
            .setThumbnail(serverQueue.songs[0].thumbnail)
            .setURL(serverQueue.songs[0].url)
            .setDescription(`${serverQueue.songs[0].title}`)
            .addFields(
                {name: '\u200B', value:'\u200B', inline: false },
                {name: 'Up Next', value:'\u200B', inline: false }
            )
        let length = serverQueue.songs.length
        if (length > 11) length = 11
        if (length > 1) {
            for (let i = 1; i < length; i++) {
                embed.addField(`${i}.  ${serverQueue.songs[i].title}`, `\u200B`, false)
            }
        } 
        message.channel.send(embed)
    },
    stop(serverQueue) {
        console.log('Stopping Music')
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
    }   
}