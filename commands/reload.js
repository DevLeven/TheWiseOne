const Discord = require('discord.js')
const botconfig = require('../botconfig.json');

module.exports.config = {
    name: 'reload',
    description: 'reloads the bot',
    execute(message, args) {

        if (message.author.id != '345238773719760899') return message.channel.send('You didnt create me so you dont have the power to control me!')

        if (!args[0]) return message.channel.send('Plase provide a command to fix!')

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch (e) {
            return message.channel.send(`Could not fix: \`${args[0].toUpperCase()}\``)
        }

        message.channel.send(`The command \`${args[0].toUpperCase()}\` has been fixed and reloaded!`)

    }
}
