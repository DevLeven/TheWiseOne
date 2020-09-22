module.exports = {
    name: 'say',
    description: 'Says a message inputed',
    execute(message, args) {
        const sayMessage = args.join(" ");
        message.delete().catch(err => console.log(err));
        message.channel.send(sayMessage);
    }
}