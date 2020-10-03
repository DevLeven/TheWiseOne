module.exports = {
    name: 'taletell',
    description: 'Says a message inputed',
    usage: '!usage',
    aliases: ['tt'],
    accessableby: 'HDev',
    execute(message, args) {
        const sayMessage = args.join(" ");
        message.delete().catch(err => console.log(err));
        message.channel.send(sayMessage);
    }
}