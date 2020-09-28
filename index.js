const Discord = require('discord.js')
const cron = require('cron')
const config = require('./config.json')
const classes = require('./class.json')

const client = new Discord.Client()
const prefix = 'k!'

client.on('ready', () => {
    console.log('I am ready!');
  });
  

client.on('message', function(message) {
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    
    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    console.log(args[1])
    const command = args.shift().toLowerCase()
    // console.log(command)
    const options = args.splice(0, args.length)
    // var attachment = null
    
    if (command == 'gura') {
        // const timeTaken = Date.now()
        attachment = new Discord.MessageAttachment(
            `https://danbooru.donmai.us/data/sample/__gawr_gura_and_bloop_hololive_and_1_more_drawn_by_keita_naruzawa__sample-67f5cddc3b10f65838069b07e9554b89.jpg`
            )
        message.channel.send(attachment)
        
    } else if (command == 'ava') {
        console.log('Users Collection = ' + options)
        if (options != '') {
            options.forEach(mentioned => {
                console.log('Mentioned = ' + mentioned)
                const user = getUserFromMention(mentioned)
                if (!user) {
                    return message.reply('Not a Valid User')
                }
                attachment = new Discord.MessageAttachment(user.displayAvatarURL())
                return message.reply(attachment)
            })
        } else {
            attachment = new Discord.MessageAttachment(message.author.displayAvatarURL())
            return message.reply(attachment)
        }
    }
})

function getUserFromMention(mention) {
    if (!mention) return

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1)

		if (mention.startsWith('!')) {
			mention = mention.slice(1)
		}
        
		return client.users.cache.get(mention)
    }
}

// let scheduleMessage = new cron.CronJob('* * * * *', () => {
//     // console.log("Berjalan")
//     var channel = client.channels.cache.get()
//     console.log(channel)

// })

// scheduleMessage.start()

client.login(config.TOKEN)