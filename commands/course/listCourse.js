const cronstrue = require('cronstrue')
const Discord = require('discord.js')
const { listCourse } = require('../../db/coursedb')

module.exports = {
    name: 'list course',
    execute(message, server) {
        listCourse(server, (err, res ) => {
            if (err) {
                console.log(err)
            }

            let embed = new Discord.MessageEmbed()
                        .setTitle('Daftar Kelas Di Server Ini')
    
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