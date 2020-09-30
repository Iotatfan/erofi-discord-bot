module.exports = {
    name: 'help',
    description: 'list of usefull command',
    execute(message, client) {
        // console.log(client)
        message.channel.send(client)
    }    
}