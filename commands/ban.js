module.exports = {
    name: 'ban',
    description: 'Chase people out of the kingdom!',
    usage: '!usage',
    noalias: 'No Aliases',
    aliases: [],
    accessableby: 'Staff',
    execute(message, args) {

            if (message.member.hasPermission('BAN_MEMBERS')) {
                const userBan = message.mentions.users.first();

                if (userBan) {
                    var member = message.guild.member(userBan);

                    if (member) {
                        member.ban({
                            reason: 'The wise one found you comiting treason therefore you have been exsiled.'
                        }).then(() => {
                            message.reply(`${userBan.tag} was exsiled from the kingdom.`)
                        })
                    } else {
                        message.reply('That person doesnt exsist or has already left the kingdom.');
                    }
                } else {
                    message.reply('you need to state clearly who broke the rules!.')
                }
            } else {
                message.reply('You dont have the power to command me!')
            }
    }
}