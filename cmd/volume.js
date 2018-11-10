cmd.run = (client, message, args, Discord, db) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");

    if (!client.music.has(message.guild.id)) return; 

    var intRegex = /^\d+$/;
    if(intRegex.test(args.join(" ")) && parseInt(args.join(" ")) > 0 && parseInt(args.join(" ")) < 201) { 
        client.music.get(message.guild.id).volume = args.join(" ");
        const dispatcher = client.music.get(message.guild.id).dispatcher;
        dispatcher.setVolume(client.music.get(message.guild.id).volume / 100); 
        message.channel.send(`Setting volume to: **${message.guild.name}** to ${args.join(" ")}`);
    } else {
        message.channel.send(`${args.join(" ")} is not a valid input, Please use a number between 1 - 200.`);
    }
    

    
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vol'],
    permLevel: 0
};