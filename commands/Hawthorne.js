module.exports = {
    name: 'divinetales',
    description: 'Call command',
    usage: '!usage',
    aliases: ['ht'],
    accessableby: 'Member',
    execute(message, args) {
        message.channel.send('This is kingdom Hawthorne the dragon race!');
    }
}