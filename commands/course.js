const Discord = require('discord.js')
const fs = require('fs')
const courseHandler = require('../utils/courseHandler')

// Options array = [ Name, Day, HH:MM, #Channel, #[Users] ]

module.exports = {
    name: 'course',
    description: 'add course reminder',
    execute(message, options) {
        // console.log('Arguments : ' + options)
        source = './course.json'
        
        var readData = fs.readFileSync(source, 'utf-8')
        var json = JSON.parse(readData)

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
        
        fs.writeFileSync(source, final, (err) => {
            if (err) throw err
            console.log('Write success')
        })

    }
}