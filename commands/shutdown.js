const Discord = require('discord.js')
const botconfig = require('../botconfig.json');

module.exports.config = {
    name: 'shutdown',
    description: 'stops the bot',
    async execute(message, args) {
        if (message.author.id != '345238773719760899') return message.channel.send('You didnt create me so you dont have the power to control me!')

        try {
            await message.channel.send('ThwWiseOne is asleep wake him up in your time of need!')
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }


    }
}
