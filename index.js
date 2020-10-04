const Discord = require('discord.js');
const { prefix, } = require('./botconfig.json');
const ms = require('ms');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});

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
    //.then(console.log)
    //.catch(console.error);
})

bot.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.find(ch => ch.name.includes('welcome'));
    const rulesChannel = member.guild.channels.find(ch => ch.name.includes('rule'));
    const welcomeText = `The Dragon <@${member.user.id}> has joined ${member.guild.name} were happy your here!\n\n Please make sure you read ${rulesChannel}!`

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

    if (!rulesChannel) {
        console.log('Could not find a rules channel so I am making one!');
        member.guild.createChannel('rules', {
            type: 'test',
            position: 1,
            topic: 'Rules channel for all users',
            permissionOverwrites: [{
                id: member.guild.id,
                allow: ['READ_MESSAGE_HISTORY', 'READ_MESSAGES', 'VIEW_CHANNEL'],
                deny: ['SEND_MESSAGES']
            }]
        }).then(console.log('Rules channel is created')).catch(console.error);
    }

    Promise.resolve(welcomeText).then(function (welcomeText) {
        welcomeChannel.send(welcomeText);
    })
})

bot.on('guildBanAdd', (guild, user) => {
    const logChannel = guild.channels.find(ch => ch.name.includes('log'));
    const banText = `${user.tag} has been exsiled from the kingdom!`;

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

    Promise.resolve(banText).then(function (banText) {
        logChannel.send(banText); // "Success"
    }, function (value) {
        // not called
    });
});

bot.on('guildBanRemove', (guild, user) => {
    const logChannel = guild.channels.find(ch => ch.name.includes('log'));
    const unbanText = `${user.tag} has been welcomed back into the kingdom!`;

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
});


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
        message.reply('Im unable to respond to your request please check if you spelt it right or visit HDev only he can help.');
    }
})

bot.login(process.env.token);