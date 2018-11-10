exports.run = (client, message, args, Discord) => {
    const voicechannel = client.isVoiceChannel(message);

    const serverQueue = client.music.get(message.guild.id).songs;
    let index = 1;

    const embed = new Discord.RichEmbed() 
    .setTitle(`Server Queue For Server: ${message.guild.name}`)
    .setDescription(`${index++} - ${serverQueue.map(songs => songs.title)}`);

    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "queue",
    description: "This command will display a list of all songs currently queued for this server",
    usage: "queue <x>"
};