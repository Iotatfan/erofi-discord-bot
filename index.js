const Discord = require('discord.js')
const fs = require('fs')
const { PREFIX, TOKEN } = require('./config/config')
const { cronReminder } = require('./db/reminderdb')
const { cronBooru } = require('./db/autoboorudb')
const { scheduleReminder, scheduleBooru } = require('./utils')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file =>
  file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.usage, command)
}

client.once('ready', () => {
  client.user.setActivity('with Papa', {
    type: 'PLAYING'
  })

  cronReminder((err, res) => {
    if (err) {
      console.log(err)
    }
    const data = res.rows
    scheduleReminder(data, client)
    console.log('Scheduling Reminder Done')
  })
  cronBooru((err, res) => {
    if (err) console.log(err)
    else {
      const data = res.rows
      scheduleBooru(null, data, client)
      console.log('Booru Scheduling Done')
    }
  })

  console.log('I am ready!')
})

client.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return

  const commandBody = message.content.slice(PREFIX.length)
  const args = commandBody.split(' ')
  const command = args.shift().toLowerCase()
  const options = args.splice(0, args.length)

  if (!client.commands.has(command)) return

  try {
    console.log(`Command ${command}`)
    client.commands.get(command).execute(message, options, client)
  } catch (err) {
    console.log(err)
    message.reply('Error executing command')
  }
})

// client.on('messageDelete', message => {
//   // if (message.author.bot) return

//   if (message.channel.id !== '734073050873725019') return

//   const author = `<@!${message.author.id}>`
//   console.log(author)

//   message.channel.send(`${author} Says : ${message.content}`)
// })

client.login(TOKEN)
