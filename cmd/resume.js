cmd.run = (client, message, args, Discord, db) => {
    if (!client.isVoiceChannel(message)) return;

    if (!client.music.has(message.guild.id)) return;

    const dispatcher = client.music.get(message.guild.id).dispatcher;
    dispatcher.resume();
    message.channel.send("Stream has been **Resumed**");
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};