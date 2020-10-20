const Discord = require('discord.js')
const { PREFIX, TOKEN} = require('./config/config')
const fs = require('fs')
const { cronReminder } = require('./db/reminderdb')
const { cronBooru } = require('./db/autoboorudb')
const { scheduleReminder, scheduleBooru } = require('./utils')

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
    
    cronReminder((err, res) => {
        let data = res.rows
        scheduleReminder.execute(data, client)   
    })
    cronBooru((err, res) => {
        if (err) console.log(err)
        else {
            let data = res.rows
            scheduleBooru.execute(null, data, client)
        }
    })
     
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

// client.on('messageDelete', message => {
//     if (message.author.bot) return

//     let author = `<@!${message.author.id}>`
//     // console.log(author)

//     message.channel.send(`${author} Says : ${message.content}`)
// })

client.login(TOKEN)