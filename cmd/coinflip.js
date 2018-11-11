const coinFace = ['Heads', 'Tails'];
exports.run = (client, message, args, Discord) => {
    function getWinner() {
        return coinFace[Math.floor(Math.random()*coinFace.length)];
    }

    console.log(getWinner());

    /*
    let winEmbed = new Discord.RichEmbed()
    .setColor('0xffffff')
    .setTitle('~ Coin Flip ~')
    .setDescription(`You Flipped ${getWinner()}!`);

    message.channel.send(winEmbed);
    */

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "coinflip",
    description: "This command runs a coinflip simulation",
    usage: "!coinflip"
};