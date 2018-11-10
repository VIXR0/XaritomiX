exports.run = (client, message, args, Discord) => {
    if (!client.isVoiceChannel(message)) return;

    if (!client.music.has(message.guild.id)) return;

    const dispatcher = client.music.get(message.guild.id).dispatcher;
    dispatcher.pause();
    message.channel.send("Stream has been **Paused**");
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
