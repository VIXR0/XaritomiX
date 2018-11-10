<<<<<<< HEAD
const Discord = require('discord.js');
exports.run = (client, message, args) => {
=======
cmd.run = (client, message, args, Discord, db) => {
>>>>>>> da0735a4dbd13c46e64f16b0b8adf8d51d74aabf
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