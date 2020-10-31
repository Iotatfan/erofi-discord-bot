const { play }= require('./music/')

module.exports = {
    name: 'music',
    description: 'Stream music from youtube \n**k!music [yt_link]** \n**k!music skip** to skip \n**k!music stop** to stop ',
    async execute(message, options, client) {

        const subCommand = options[0]

        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.channel.send(
            "Masuk VC dulu bang"
        )
        
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
            return message.channel.send(
                "Ga punya permission bang"
            )

        play.check(voiceChannel, message, subCommand)
    }
}
