module.exports = {
  name: 'Help',
  usage: 'help',
  description: 'List of useful command',
  execute (message, options, client) {
    const commandsArray = client.commands.array()
    let toSend = []

    if (options.length > 0) {
      const command = client.commands.get(options[0])
      toSend = {
        embed: {
          title: `Command for ${command.name}`,
          color: '00FF00',
          description: `${command.description}`
        }
      }
    } else {
      toSend = {
        embed: {
          title: 'Command List',
          color: '00FF00',
          fields: []
        }
      }
      commandsArray.forEach((command) => {
        if (command.name !== 'Help') {
          toSend.embed.fields.push({
            name: `${command.name}`,
            value: `${command.description}`
          })
        }
      })
    }

    message.channel.send(toSend)
  }
}
