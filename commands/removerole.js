const Discord = require('discord.js');

module.exports = {
    name: 'removerole',
    description: 'removes roles!',
    async execute(message, args) {

        if(!message.member.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('You dont have the power to control me.')

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if(!rMember) return message.channel.send('Please provide a user to remove the role!')
        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send('please provide a role to remove from the user!')
        let reason = args.slice(2).join('')
        if(!reason) return message.channel.send('Please provide a reason')

        if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I cannot do that I need permission from a guardian ask HDev or The LEADERS!')

        if(rMemeber.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayname}, dosemt have that role!`)
        } else {
           await rMember.removeRole(role.id).catch(e => console.log(e.message))
           message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayname}.`)
        }

        let embed = new Discord.RichEmbed()
        .setColor(0x6509ed)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField('Moderation:', 'ban')
        .addField('Mutee:', rMember.user.username)
        .addField('Moderator:', message.author.username)
        .addField('Reason:', reason)
        .addField('Date:', message.createdAt.toLocale.String())

            let sChannel = message.guild.channels.find(c.name === 'tnt-modlogs')
            sChannel.send(embed)


    }
}