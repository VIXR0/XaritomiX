exports.run = (client, message, args, Discord) => {
    if (!client.isVoiceChannel(message)) return;
    if (!client.music.has(message.guild.id)) return; 

    const dispatcher = client.music.get(message.guild.id).dispatcher;
    client.music.get(message.guild.id).songs = []; 
    dispatcher.end();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "stop",
    description: "This command will stop anything that is currently playing, clear the queue and disconnect from the VoiceChannel",
    usage: "stop"
};