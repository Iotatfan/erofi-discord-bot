const { APP_ID, TOKEN, PUBLIC_KEY } = require('../config/config')
const { SlashCreator, GatewayServer } = require('slash-create')
const path = require('path')

module.exports = (client) => {
  const creator = new SlashCreator({
    applicationID: APP_ID,
    authToken: TOKEN,
    publicKey: PUBLIC_KEY
  })

  creator
    .withServer(
      new GatewayServer(
        (handler) => client.ws.on('INTERACTION_CREATE', handler)
      )
    )
    .registerCommandsIn(path.join(__dirname, '..', 'slash'))
    .syncCommands()

  console.log(creator.commands)
}
