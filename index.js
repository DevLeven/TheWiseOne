const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');
const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.
endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log('The wise one has awoken.');
    bot.user.setActivity('Hawthorne for centurys', { type: "WATCHING" })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
    bot.user.setStatus('dnd')
        .then(console.log)
        .catch(console.error);
})

bot.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.find(ch => ch.name.includes('welcome'));
    const welcomeText = `The Dragon @${member.user.id}> has joined ${member.guild.name} were happy your here!`

    if (!welcomeChannel) {
        console.log('Could not find the entrence so i made one!');
        member.guild.createChannel('welcome', {
            type: 'text',
            position: 0,
            topic: 'Welcome channel for new users.',
            permissionOverwrites: [{
                id: member.guild.id,
                allow: ['READ_MESSAGE_HISTORY', 'READ_MESSAGES', 'VIEW_CHANNEL'],
                deny: ['SEND_MESSAGES']
            }]
        }).then(console.log('welcome channel created')).catch(console.error);
    }

    Promise.resolve(welcomeText).then(function (welcomeText) {
        welcomeChannel.send(welcomeText);
    })
})


bot.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) || bot.commands.find
    (cmd => cmd.aliases && cmd.aliases.includes(commandName));

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Im unable to respond to your request please visit HDev only he can help.');
    } 
 })

bot.login(process.env.token);