exports.run = (client, message, args, Discord) => {
    const voicechannel = client.isVoiceChannel(message);
    if (!client.music.has(message.guild.id)) return; 
    const serverQueue = client.music.get(message.guild.id).songs;
    let index = 1, page = 1, totalPages;

    totalPages = 1;
    let embed = new Discord.RichEmbed() 
    .setTitle(`Server Queue For Server: ${message.guild.name}`)
    .setDescription(`${index++} - ${serverQueue.map(songs => songs.title)}`)
    .setFooter(`You are on page: ${page} / ${totalPages}`)

    message.channel.send(embed);
}
function queueChunk() {

    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['leave'],
    permLevel: 0
};
  
exports.help = {
    name: "queue",
    description: "This command will display a list of all songs currently queued for this server",
    usage: "queue <x>"
};