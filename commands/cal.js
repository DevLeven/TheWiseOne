module.exports = {
    name: 'cal',
    description: 'dose your homework',
    execute(message, args) {
        message.channel.send('Finding my response time...').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`The wise ones response time is ${ping}ms`);
        })
    }
}