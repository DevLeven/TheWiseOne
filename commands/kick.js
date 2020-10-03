module.exports = {
    name: 'kick',
    description: 'Exsiles people from the kingdom!',
    usage: '!usage',
    noalias: 'No Aliases',
    aliases: [],
    accessableby: 'Staff',
    execute(message, args) {

        if (message.member.hasPermission('KICK_MEMBERS')) {
            const userKick = message.mentions.users.first();

            if (userKick) {
                var member = message.guild.member(userKick);

                if (member) {
                    member.kick('you have been found guilty by the wise one!').then(() => {
                        message.reply(`kicked user ${userKick.tag}!`);
                    }).catch(err => {
                        message.reply('I wasent able to catch the user.')
                        console.log(err);
                    })
                } else {
                    message.reply('that user has alreay left the kingdom!')
                }
            } else {
                message.reply('you need to state clearly who you want gone!')
            }
        } else {
            message.reply('You dont have the power to command me!')
        }
    }
}