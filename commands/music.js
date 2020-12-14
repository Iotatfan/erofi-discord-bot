const { play } = require('./music/')
const { PREFIX } = require('../config/config')

const usage = 'play'

module.exports = {
    name: 'Play Music',
    usage: usage,
    description: `Stream music from youtube \n**${PREFIX}${usage} [yt_link]**
                    *${PREFIX}${usage} skip** to skip 
                    **${PREFIX}${usage} stop** to stop
                    **${PREFIX}${usage} list** to show queue list`,
    async execute(message, options, client) {

        const subCommand = options[0]

        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.channel.send(
            "Please enter the voice channel first, I'll follow you"
        )
        
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
            return message.channel.send(
                "I don't have the permission to join voice channel"
            )

        play.check(voiceChannel, message, subCommand)
    }
}
