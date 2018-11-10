exports.run = (client, message, args) => {
    if (!client.isVoiceChannel(message)) return;

    if (!client.music.has(message.guild.id)) return;

    const dispatcher = client.music.get(message.guild.id).dispatcher;
    dispatcher.resume();
    message.channel.send("Stream has been **Resumed**");
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "resume",
    description: "This command will resume the stream",
    usage: "resume"
};