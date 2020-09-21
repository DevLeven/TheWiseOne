const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mutes people!',
    execute(message, args) {

        if (message.member.hasPermission('MUTE_MEMBERS')) {

            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))

            if (!person) return message.reply('I could not find that member.');

            let mainrole = message.guild.roles.find(role => role.name === 'Guest');
            let muterole = message.guild.roles.find(role => role.name === 'Mute');
            let time = args[1];

            if (mainrole) {
                message.guild.defaultRole.setPermissions(0);
            }

            if (!muterole) {
                message.channel.send('This server dosent have a keep so I created one!');
                console.log('This server has no Keep.. creating one.');
                message.guild.createRole({
                    name: 'Muted',
                    color: 'GREY',
                    permissions: ['VIEW_CHANNEL', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY']
                }).then(role => console.log(`Created ${role.name} which has the color of ${role.color} for ${message.guild.name}.`)).catch(console.error);
                message.channel.send('Keep has been created for the server!\n Retype the command to mute the user.')
            } else
                if (!time) {
                    return message.reply('Please enter time I that I should put member in keep?');
                }

            const logChannel = guild.channels.find(ch => ch.name.includes('log'));
            const muteText = `$@${person.user.username} has been sent to the keep for ${ms(ms(time))}`;
            const unmuteText = `@${person.user.username} has left the keep!`;

            if (!logChannel) {
                console.log('Could not find the report tab. Creating one now...');
                guild.createChannel('logs', {
                    type: 'text',
                    position: 0,
                    topic: 'Report tab for the server to keep things in track!',
                    permissionOverwrites: [{
                        id: guild.id,
                        deny: ['SEND_MESSAGES'],
                        allow: ['READ_MESSAGE_HISTORY', 'VIEW_CHANNEL']
                    }]
                })
                    .then(console.log)
                    .catch(console.error);
            }

            Promise.resolve(unbanText).then(function (unbanText) {
                logChannel.send(unbanText); // "Success"
            }, function (value) {
                // not called
            });

            person.removeRole(mainrole);
            person.addRole(muterole);

            message.channel.send(`@${person.user.username} has been sent to the keep for ${ms(ms(time))}`);
            message.logChannel.send(muteText);
            setTimeout(function () {
                person.addRole(mainrole);
                person.removeRole(muterole);
                message.channel.send(`@${person.user.username} has left the keep!`)
                message.channel.send(unmuteText);
            }, ms(time));

        } else {
            message.reply('You dont have the power to use me!')
        }
    }
}