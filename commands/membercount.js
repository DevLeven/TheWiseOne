const Discord = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'when mentioned shows the ammount of members on a server!',
    usage: '!usage',
    aliases: ['mc'],
    accessableby: 'Member',
    execute(message, args) {
        const membersInServer = message.guild.memberCount;
        const memberEmbed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name} has ${membersInServer} members in the Kingdom!`);

        message.channel.send(memberEmbed);
    }
}