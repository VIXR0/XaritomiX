<<<<<<< HEAD
exports.run = (client, message, args, Discord) => {
=======
<<<<<<< HEAD
const Discord = require('discord.js');
exports.run = (client, message, args) => {
=======
cmd.run = (client, message, args, Discord, db) => {
>>>>>>> da0735a4dbd13c46e64f16b0b8adf8d51d74aabf
>>>>>>> ac4c4fe45df4fe739c806a68e7b4520a5114bf81
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

<<<<<<< HEAD
exports.conf = {
=======
<<<<<<< HEAD
function queueChunk() {

    
}

exports.conf = {
=======
cmd.conf = {
>>>>>>> b6d49c01616736c48593c5ce6718da3cff73f369
>>>>>>> ac4c4fe45df4fe739c806a68e7b4520a5114bf81
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