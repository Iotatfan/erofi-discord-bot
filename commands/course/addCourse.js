const { addCourse } = require('../../db/coursedb')
const { courseHandler, scheduleCourse } = require('../../utils/')

module.exports = {
    name: 'add course',
    execute(message, options, client, server) {

        let { courseName, cronTime, channel, users } = courseHandler.execute(options)
    
            // TO DO Better String Handler
            // TO DO Day-Time Converter to CRON Format
        const values = [courseName, cronTime, channel, users, server]

        addCourse(values, (err, res) => {
            if (err) {
                console.log(err)
                return message.channel.ssend('Gagal Menambahkan Kelas')
            } else {
                const data = res.rows
                scheduleCourse.execute(data, client)
                message.channel.send('Kelas Berhasil Ditambahkan')
            }
        })
            
    }
}