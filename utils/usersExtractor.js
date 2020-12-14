module.exports = {
  name: 'usersExtractor',
  description: 'convert users string into array',
  execute (mention) {
    if (!mention) return

    if (mention.startsWith('{') && mention.endsWith('}')) {
      mention = mention.slice(1, -1)
      mention = mention.split(',')
      const users = []

      mention.forEach(user => {
        user = user.slice(1, -1)
        users.push(user)
      })

      return users
    } else return mention
  }
}
