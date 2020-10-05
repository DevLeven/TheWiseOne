module.exports = {
    name: 'rule',
    description: 'Provides a server rule as requested.',
    async execute(message, args) {
        const rule = parseInt(args[0], 10);

        if (!rule || rule < 1 || rule > 12) return message.reply('Which rule do you want me to clearify pick between 1, 10 or the discord guidelines/terms!');

        if(rule) {
            const botChannel = await message.guild.channels.find(ch => ch.name.includes('command'));

            if (rule === 1) return message.channel.send('No racial slurs!');

            if (rule === 2) return message.channel.send('No advertising except in designated channel also no DM advertising!');

            if (rule === 3) return message.channel.send('No voice changers in VC also no impersinating other people!');

            if (rule === 4) return message.channel.send('Please ony speak english srry.');

            if (rule === 5) return message.channel.send('Being toxic is not allowed!');

            if (rule === 6) return message.channel.send('Criticism on Divine Tales is allowed but any hateful comments or threats are not and will result in an INSTA-BAN!');

            if (rule === 7) return message.channel.send('Keep chat SFW!');

            if (rule === 8) return message.channel.send('Cussing is allowed but to much that it becomes toxic is not!');

            if (rule === 9) return message.channel.send('You arent allowed to misuse spoilers by giving the apperance of swearing or something inappropriate!');

            if (rule === 10) return message.channel.send('Dont constantly beg for nitro,roles,items or anything of that sort!');
            
            if (rule === term) return message.channel.send('Read the terms of discord\n**https://discordapp.com/terms!**');
            
            if (rule === guidelines) return message.channel.send('Read the guidlines of discord\n**https://discordapp.com/guidelines**');
        }
    }
}
