const Discord = require('discord.js')
const fs = require('fs')
const myCourse = require('../src/course.json')
const courseHandler = require('../utils/courseHandler')
const cronstrue = require('cronstrue')

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

            let embed = new Discord.MessageEmbed()
                .setTitle('Daftar Kelas')

            myCourse.forEach( (course, index) => {
                let time = cronstrue.toString(course.time)
                embed.addField(`${index+1}. ${course.class}`, time , false)
            })

            message.channel.send(embed)
        } else {
            let { courseName, cronTime, channel, users } = courseHandler.execute(options)
            // name, day, time, channel, user = courseHandler.execute(options)
    
            // TO DO Better String Handler
            // TO DO Day-Time Converter to CRON Format
            let course = {
                class: courseName,
                time: cronTime,
                channel: channel,
                users: users
            }
            // let data = JSON.stringify(course)
            json.push(course)
            let final = JSON.stringify(json, null, 2)
            // console.log(final)
            
            try {
                fs.writeFileSync(source, final, (err) => {
                    if (err) throw err
                    console.log('Write success')
                })
                message.reply('Kelas Berhasil Ditambahkan')
            } catch (err) {
                console.log(err)
                message.reply('Kelas Gagal Ditambahkan')
            }
        }
    }
}