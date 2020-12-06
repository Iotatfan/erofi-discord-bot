const cronstrue = require('cronstrue')
const Discord = require('discord.js')
const { listReminder } = require('../../db/reminderdb')

module.exports = {
    name: 'list reminder',
    execute(message, server) {
        listReminder(server, (err, res ) => {
            if (err) {
                console.log(err)
            }

            let embed = new Discord.MessageEmbed()
                        .setTitle('List of Reminder in This Server')
                        .setColor('00FF00')
    
            const data = res.rows

            data.forEach( (row, index) => {
                console.log(row)
                let time = cronstrue.toString(row.crontime)
                embed.addField(`${index+1}. ${row.course}`, `${time}`, false)
            })

            message.channel.send(embed)
        })
    }
}