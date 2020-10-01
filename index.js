const Discord = require('discord.js')
const cron = require('node-cron')
const { PREFIX, TOKEN} = require('./config/config.json')
const usersExtract = require('./utils/courseUsersExtractor')
const db = require('./config/db')
const fs = require('fs')

const client = new Discord.Client() 
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file =>
    file.endsWith('.js'))

console.log(commandFiles)

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('I am ready!');
    
    db.client
        .query('select * from courses where ')
        .then(res => {
            const data = res.rows

            data.forEach( (row, index) => {
                console.log(row)
                const users = usersExtract.execute(row.users)
                console.log(users)

                cron.schedule(
                    row.crontime, 
                    function() {
                        const ch = client.channels.cache.get(row.channel)
                        ch.send('Saatnya kelas ' + row.course + ` ${users} `)
                }, 
                {
                    scheduled: true,
                    timezone: 'Asia/Jakarta'
                })
            })
        })
        .catch(e => console.log(e))
    
  })
  

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot ) return
    
    const commandBody = message.content.slice(PREFIX.length)
    const args = commandBody.split(' ')
    // console.log(args[1])
    const command = args.shift().toLowerCase()
    // console.log(command)
    const options = args.splice(0, args.length)
    // var attachment = null

    if(!client.commands.has(command)) return

    try {
        console.log('command ' + command)
        client.commands.get(command).execute(message, options, client);
    } catch (err) {
        console.log(err)
        message.reply('Error executing command')
    }
    
})

client.login(TOKEN)