const Discord = require('discord.js')

module.exports = {
    name: 'gura',
    description: 'send gura image',
    execute(message) {
        // console.log(message)
        attachment = new Discord.MessageAttachment(
            `https://danbooru.donmai.us/data/sample/__gawr_gura_and_bloop_hololive_and_1_more_drawn_by_keita_naruzawa__sample-67f5cddc3b10f65838069b07e9554b89.jpg`
            )
        message.channel.send(attachment)
    }
}