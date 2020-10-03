const Discord = require('discord.js');

module.exports = {
    name: 'hawthornesocials',
    description: 'Gives subscriber link!',
    usage: '!usage',
    aliases: ['hs'],
    accessableby: 'Member',
    execute(message, args) {
        
            const HawthorneEmbed = new Discord.RichEmbed()
                .setColor(0x6509ed)
                .setTitle('Hawthorne Socials!')
                .setURL('https://www.youtube.com/channel/UCdLikiTljWWrBhb57ZktRBQ')
                .setURL('https://www.youtube.com/channel/UCtdYIERL5mgxke3WvuPfGew')
                .setDescription('This are the Hawthorne socials please subscribe to be notified when Hawthorne uploads a new video!')
                .setAuthor(message.author.username)
                .addField('Subscribe!', 'Subscribe to always be notified when Hawthorne comes out with a new video!')
                .setThumbnail(message.author.avatarURL)
                .setFooter('Subscribe!')
                .setTimestamp()
            try {
                message.channel.send(HawthorneEmbed);
            } catch {
                message.reply(`Sorry <@${message.author.username}> I cannot message you make sure your DMS are on`)
            }
    }
}