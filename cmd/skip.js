exports.run = (client, message, args, Discord) => {
    let params = args.join(" ");
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");
    let option = parseInt(params);
    var intRegex = /^\d+$/;

    try {
        if (option > 1) {
            for (let i = 0; i < option - 1; i++) {
                client.music.get(message.guild.id).songs.shift();
            }
            
            const dispatcher = client.music.get(message.guild.id).dispatcher
            dispatcher.end();
            return message.channel.send(`Skipping ${option} ${(parseInt(option).length < 2) ? "Song" : "Songs"}`)
        }
    } catch(err) {
        console.log(err)
    }

    if (intRegex.test(option) && !args[0]) {
        message.channel.send(`Skipping song: **${client.music.get(message.guild.id).songs[0].title}**`)
        const dispatcher = client.music.get(message.guild.id).dispatcher;
        dispatcher.end(); 
        return;
    }

    let RUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let tempArray = [];
    let currentArray = client.music.get(message.guild.id).songs;
    for (let i = 0; i < client.music.get(message.guild.id).songs.length; i++) {
        
        if (client.music.get(message.guild.id).songs[i].username == RUser.user.username) {
            currentArray.shift();
        }
        tempArray.push({
            title: currentArray[i].title,
            url: `https://youtube.com/watch?v=${currentArray[i].id}`,
            id: currentArray[i].id,
            hours: currentArray[i].hours,
            minutes: currentArray[i].minutes,
            seconds: currentArray[i].seconds,
            requester: currentArray[i].requester,
            username: currentArray[i].username
        });
        currentArray.shift()
    }
    for (let x = 0; x < tempArray.length; x++) {
        currentArray.push({
            title: tempArray[x].title,
            url: `https://youtube.com/watch?v=${tempArray[x].id}`,
            id: tempArray[x].id,
            hours: tempArray[x].hours,
            minutes: tempArray[x].minutes,
            seconds: tempArray[x].seconds,
            requester: tempArray[x].requester,
            username: tempArray[x].username
        });
    }
    return message.channel.send(`Removed all song by ${RUser.nickname} from the queue`);
    
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