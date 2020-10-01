const Discord = require('discord.js')
const courseHandler = require('../utils/courseHandler')
const cronstrue = require('cronstrue')
const db = require('../config/db')
const scheduleCourse = require('../utils/scheduleCourse')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'course',
    description: 'add course reminder',
    execute(message, options) {
        
        let server = message.guild.id
        console.log(server)
        
        if (options[0] == 'list') {

            db.client
                .query(`select * from courses where server = '${server}'`)
                .then(res => {
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
                .catch(e => {
                    console.log(e)
                    message.reply('AAAAAAAAAAAA Gabisa nampilin :(')
                })

            
        } else {
            let { courseName, cronTime, channel, users } = courseHandler.execute(options)
    
            // TO DO Better String Handler
            // TO DO Day-Time Converter to CRON Format
            
            try {
                const text = 'insert into courses(course, crontime, channel, users) values($1, $2, $3, $4, $5) returning *'
                const values = [courseName, cronTime, channel, users, server]

                db.client
                    .query(text, values)
                    .then(res => {
                        console.log(res.rows[0])
                        const data = res.rows[0]
                        scheduleCourse(data)
                    })
                    .catch(e => console.log(e))

                message.reply('Kelas Berhasil Ditambahkan')
            } catch (err) {
                console.log(err)
                message.reply('Kelas Gagal Ditambahkan')
            }
        }
    }
}