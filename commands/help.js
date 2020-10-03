const Discord = require('discord.js')
const botconfig = require('../botconfig.json');
const prefix = botconfig.prefix

module.exports = {
    name: 'help',
    description: 'helps user figure out diffrent commands!',
    usage: '!usage',
    aliases: ['h', 'help', 'commands'],
    noalias: 'No Aliases',
    accessableby: 'Staff',
    async execute(message, args) {

        if(args[0] === 'help') return message.channel.send(`To get the help comamd do ${prefix}help instaed!`)

        if(args[0]) {
            let command = args[0];
            if(bot.commands.has(command)) {
                command = bot.commands.get(command);
                var SHembed = new Discord.RichEmbed()
                .setColor(0x6509ed)
                .setAuthor(`TheWiseOne HELP`, message.guild.iconURL)
                .setDescription(`My call command is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || 'No Description'}\n**Usage:** ${command.config.usage || 'No Usage'}\n**Accessable by:** ${command.config.accessableby || 'Members'}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
                message.channel.send(SHembed);
            }}
        if(!args[0]) {
            message.delete();
            let embed = new Discord.RichEmbed()
            .setAuthor('Help Command!', message.guild.iconURL)
            .setColor(0x6509ed)
            .setDescription(`${message.author.username} Check your DMS!`)

            let Sembed = new Discord.RichEmbed()
            .setColor(0x6509ed)
            .setAuthor(`TheWiseOne Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`This are the commands for TheWiseOne!\nThe bot prefix is: ${prefix}`)
            .addField(`Commands:`, '``addrole`` ``avater`` ``ban`` ``cal`` ``Hawthorne`` hawthornesocials`` ``kick`` ``membercount`` ``mute`` ``ping`` ``purge`` ``removerole`` ``rule`` ``server`` ``taletell`` ``user-info`` ``vote``')
            .addFooter('TheWiseOne', bot.user.displayAvatarURL)
            message.channel.send(embed).then(m => m.delete(10000));
            message.author.send(Sembed)

        }
    }
}