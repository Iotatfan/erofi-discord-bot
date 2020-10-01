const Discord = require('discord.js')
const { PREFIX, TOKEN} = require('./config/config.json')
const db = require('./config/db')
const fs = require('fs')
const scheduleCourse = require('./utils/scheduleCourse')

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
    
    db.client
    .query('select * from courses')
    .then(res => {
        const data = res.rows
        scheduleCourse.execute(data, client)
        
    })
    .catch(e => console.log('Error Fetching DB ' + e))
    
    console.log('I am ready!');
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