module.exports = {
    name: 'purge',
    description: 'Removes messages sent in chat.',
    async execute(message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const deleteCount = parseInt(args[0], 10);
            const deleteMessage = `Removed ${deleteCount} messages!`;

            if (!deleteCount || deleteCount > 100 || deleteCount < 2) return message.reply('Give me a resonable number!');

            const fetched = await message.channel.fetchMessages({
                limit: deleteCount
            });

            message.channel.bulkDelete(fetched)
            .catch(err => console.log(`I cannot remove messages because of ${error}`))
            .then(message.reply(deleteMessage))
            .catch(err => {
                console.log(err);
            });

        } else {
            message.reply('you do not have the power to control me!');
        }
    }
}