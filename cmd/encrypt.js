const request = require("node-superfetch");

exports.run = (client, message, args, Discord) => {
    let msgEnc = args[0];

    if (!args[0]) {
        message.channel.send('Usage: !encrypt <message>');
    }

    if (args[0]) {
        try {
            const { body } = await request
                .get(`https://md5.pinasthika.com/api/encrypt?value=${msgEnc}`);

            let response = JSON.parse(body);

            let embed = new Discord.RichEmbed()
            .setColor("0xffffff")
            .addField(`MD5 Hash For '${msgEnc}'`, response.result, true);

            message.channel.send(embed);
        } catch (err) {
            console.log(err);
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}
  
exports.help = {
    name: "encrypt",
    description: "This command encrypts a message in an MD5 hash",
    usage: "!encryot <text>"
}