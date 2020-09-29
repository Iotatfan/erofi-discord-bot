const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'course',
    description: 'add course reminder',
    execute(message, options) {
        // console.log('Arguments : ' + options)
        source = './course.json'
        
        var readData = fs.readFileSync(source, 'utf-8')
        var json = JSON.parse(readData)

        // TO DO Better String Handler
        let course = {
            class: options[0],
            time: options[1],
            channel: options[2],
            users: options[3]
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