const slots = ['🍊', '🍒', '🍋'];

exports.run = (client, message, args, Discord) => {
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];

    let winEmbed = new Discord.RichEmbed()
    .setColor('0xffffff')
    .setTitle('~ Win ~')
    .setDescription('Congratulations!')
    .addField("Slot Outcome", `${slotOne} | ${slotTwo} | ${slotThree}`, true);

    let loseEmbed = new Discord.RichEmbed()
    .setColor('0xffffff')
    .setTitle('~ Loss ~')
    .setDescription('Better Luck Next Time!')
    .addField("Slot Outcome", `${slotOne} | ${slotTwo} | ${slotThree}`, true);

    if (slotOne == slotTwo && slotOne == slotThree) {
        message.channel.send(winEmbed);
    } else {
        message.channel.send(loseEmbed);
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "slots",
    description: "This command runs a slots simulation",
    usage: "!slots"
};