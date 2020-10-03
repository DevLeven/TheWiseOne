const Discord = require('discord.js');

module.exports = {
    name: 'avater',
    description: 'Takes someones avater and steals it.',
    usage: '!usage',
    aliases: ['av'],
    accessableby: 'Member',
    execute(message, args) {
        if (args[0]) {
            const user = message.mentions.users.first();
            if (!user) return message.reply('Please mention the user you want to steal!');

            const otherIconEmbed = new Discord.RichEmbed()
                .setTitle(`${user.username}'s Avatar!`)
                .setImage(user.displayAvatarURL);

            return message.channel.send(otherIconEmbed).catch(err => console.log(err));
        }

        const myIconEmbed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Avatar!`)
            .setImage(message.author.displayAvatarURL);

        return message.channel.send(myIconEmbed).catch(err => console.log(err));
    }
}