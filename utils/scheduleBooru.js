const cron = require('node-cron')
const Discord = require('discord.js')
const Booru = require('booru')

module.exports = {
    name: 'scheduleBooru',
    execute(tag, channel, client) {  
        console.log(channel)

        cron.schedule(
            '0 * * * *',         // Change it to dynamic later
            function() {
                Booru.search(
                    'safebooru',
                    [tag],
                    {
                        limit: 1,
                        random: true
                    })
                    .then(posts => {
                        for (let post of posts) {
                            const attachment = new Discord.MessageAttachment(post.fileUrl)
                            const ch = client.channels.cache.get(channel)
                            ch.send(attachment)
                        }
                    })
                    .catch ( err => {
                        console.log(err)
                        const ch = client.channels.cache.get(channel)
                        ch.send('Gagal ngirim :(')
                    })
        }, 
        {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })
        
    }
}