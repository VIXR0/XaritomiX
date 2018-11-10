exports.run = (client, message, args, Discord) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");

    message.channel.send(`Skipping song: **${client.music.get(message.guild.id).songs[0].title}**`)
    const dispatcher = client.music.get(message.guild.id).dispatcher;
    dispatcher.end(); 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "skip",
    description: "Will skip the currently playing song in the queue",
    usage: "skip (X amount of songs :: 1 by default)"
};