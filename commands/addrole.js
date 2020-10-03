const Discord = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'adds roles',
    async execute(message, args) {

        if(!message.member.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('You dont have the power to control me.')

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if(!rMember) return message.channel.send('Please provide a user to add role to!')
        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send('please provide a role to add to user!')
        let reason = args.slice(2).join('')
        if(!reason) return message.channel.send('Please provide a reason')

        if(!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I cannot do that I need permission from a guardian ask HDev or The LEADERS!')

        if(rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, already has the role ${role.name}!`)
        } else {
           await rMember.addRole(role.id).catch(e => console.log(e.message))
           message.channel.send(`The role, ${role.name}, has been added to ${rMember.displayName}.`)
        }

        let embed = new Discord.RichEmbed()
        .setColor(0x6509ed)
        .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
        .addField('Moderation:', 'AddRole')
        .addField('Member:', rMember.user.username)
        .addField('Moderator:', message.author.username)
        .addField('Reason:', reason)
        .addField('Date:', message.createdAt.toLocaleString())

            let sChannel = message.guild.channels.find(c => c.name === 'logs')
            sChannel.send(embed)
    }
}