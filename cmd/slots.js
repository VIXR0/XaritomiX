const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

exports.run = (client, message, args) => {
    const slotOne = slots[Math.floor(Math.random() * slots.length)];
    const slotTwo = slots[Math.floor(Math.random() * slots.length)];
    const slotThree = slots[Math.floor(Math.random() * slots.length)];

    if (slotOne == slotTwo && slotOne == slotThree) {
        message.channel.send(`\`${slotOne} | ${slotTwo} | ${slotThree}\nCongrats! You Won!\``);
    } else {
        message.channel.send(`\`${slotOne} | ${slotTwo} | ${slotThree}\nAww, Better Luck Next Time!\``);
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