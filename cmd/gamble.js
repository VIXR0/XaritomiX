exports.run = (client, message, args, Discord) => {
    const loss = Math.floor(Math.random() * 10);
    const num = Math.floor(Math.random() * 10);

    let winEmbed = new Discord.RichEmbed()
    .setColor("0xffffff")
    .setDescription("Congratulations, you have won!");

    let loseEmbed = new Discord.RichEmbed()
    .setColor("0xffffff")
    .setDescription("Sorry, you have lost!");

    if (num == loss) {
        message.channel.send(loseEmbed);
    } else {
        message.channel.send(winEmbed);
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}
  
exports.help = {
    name: "gamble",
    description: "This command runs a chance simulation",
    usage: "!gamble"
}