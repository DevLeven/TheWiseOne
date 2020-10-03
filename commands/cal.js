module.exports = {
    name: 'cal',
    description: 'dose your homework',
    usage: '!usage',
    noalias: 'No Aliases',
    aliases: [],
    accessableby: 'Member',
    execute(message, args) {
        message.channel.send('Finding my response time...').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`The wise ones response time is ${ping}ms`);
        })
    }
}