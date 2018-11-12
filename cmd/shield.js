const request = require("node-superfetch");

exports.run = async (client, message, args, Discord) => {
    let subject = args[0]
    let status = args[1]
    let color = args[2]

    if (!args[0] || !args[1] || !args[2]) {
        message.channel.send('Usage: !shield <subject> <status> <color>');
    }

    if (args[0] && args[1] && args[2]) {
        try {
            const { body } = await request.get(`https://img.shields.io/badge/${subject}-${status}-${color}.png`);
            return message.channel.send({ files: [{ attachment: body, name: 'badge.png' }] });
        } catch (err) {
            if (err.status === 404) return message.reply('Could not create the badge...');
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "shield",
    description: "This command will create a shield image.",
    usage: "shield <subject> <status> <color>"
};