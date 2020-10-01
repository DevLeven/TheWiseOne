const Discord = require('discord.js')

module.exports = {
    name: 'user-info',
    description: 'Shows user info when user is mentoned!',
    execute(message, args) {
        let mentionedMember = message.mentions.members.first();
        let mentionedUser = message.mentions.users.first();

        const userEmbed = new Discord.RichEmbed()
        .setTitle(`User information for ${mentionedUser.username}`)
        .addField('Username:', `${mentionedUser.username}`)
        .addField('User ID:', `${mentionedUser.id}`)
        .addField('Account created:', `${mentionedUser.createdAt}`)
        .addField('Joined the server at:', `${mentionedMember.joinedAt}`)
        .addField('User status:', `${mentionedUser.presence.status}`)

        message.channel.send(userEmbed).catch(err => console.log(err));
    }
}