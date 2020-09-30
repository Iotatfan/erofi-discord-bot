const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'list of usefull command',
    execute(message, options ,client) {
        let commandsArray = client.commands.array()
        console.log(commandsArray)
        
        let embed = new Discord.MessageEmbed()
            .setTitle('Command List')


        commandsArray.forEach( (command, index) => {
            embed.addField(`${index+1}. ${command.name}`, `${command.description}`, false)
        })

        message.channel.send(embed)
    }    
}