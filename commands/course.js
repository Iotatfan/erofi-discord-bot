const Discord = require('discord.js')
const fs = require('fs')
const myCourse = require('../src/course.json')
const courseHandler = require('../utils/courseHandler')
const cronstrue = require('cronstrue')
const db = require('../config/db')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'course',
    description: 'add course reminder',
    execute(message, options) {
        // console.log('Arguments : ' + options)
        source = './src/course.json'
        
        var readData = fs.readFileSync(source, 'utf-8')
        var json = JSON.parse(readData)
        
        if (options[0] == 'list') {

            db.client
                .query('select * from courses')
                .then(res => {
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Daftar Kelas')

                    const data = res.rows

                    data.forEach( (row, index) => {
                        console.log(row)
                        let time = cronstrue.toString(row.crontime)
                        embed.addField(`${index+1}. ${row.course}`, time , false)
                    })

                    message.channel.send(embed)
                })
                .catch(e => console.log(e))

            
        } else {
            let { courseName, cronTime, channel, users } = courseHandler.execute(options)
            // name, day, time, channel, user = courseHandler.execute(options)
    
            // TO DO Better String Handler
            // TO DO Day-Time Converter to CRON Format
            
            try {
                const text = 'insert into courses(course, crontime, channel, users) values($1, $2, $3, $4) returning *'
                const values = [courseName, cronTime, channel, users]

                db.client
                    .query(text, values)
                    .then(res => console.log(res.rows[0]))
                    .catch(e => console.log(e))

                message.reply('Kelas Berhasil Ditambahkan')
            } catch (err) {
                console.log(err)
                message.reply('Kelas Gagal Ditambahkan')
            }
        }
    }
}