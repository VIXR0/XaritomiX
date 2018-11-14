const settings = require("../dfsettings.json");
const youtube = require("youtube-node");
const ytapi = new youtube();
ytapi.setKey(settings.YTAPI);

exports.run = (client, message, args, Discord) => {
    const voicechannel = client.isVoiceChannel(message);
    if (!client.music.has(message.guild.id)) return; 
    const serverQueue = client.music.get(message.guild.id).songs;

    displayEmbed(message, chunkArray(serverQueue, 10), Discord, args.join(''), serverQueue, client);
    
}
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}

function displayEmbed(message, serverQueue, Discord, args, playlist, client) {
    let nowPlaying = serverQueue[0][0];
    ytapi.related(nowPlaying.id, 5, function(error, result) {
        if (error) return;
        sendMessage(message, serverQueue, Discord, args, playlist, client, result);
    });
}

function newArrayForSongs(currentPlaylist) {
    let tempSongs = [];
    for (var i = 0; i < currentPlaylist.length; i++) {
        tempSongs.push({
            title: currentPlaylist[i].title,
            url: currentPlaylist[i].url,
            id: currentPlaylist[i].id,
            hours: currentPlaylist[i].hours,
            minutes: currentPlaylist[i].minutes,
            seconds: currentPlaylist[i].seconds,
            requester: currentPlaylist[i].requester
        });

    } 
    tempSongs.shift();
    let newPlaylist = chunkArray(tempSongs, 10);
    return newPlaylist;
}

function sendMessage(message, serverQueue, Discord, args, playlist, client, related) {
    let page = args;
    let totalPages = serverQueue.length;
    let index = 1;
    let relatedIndex = 1; 
    let nowPlaying = serverQueue[0][0];
    let newServerQueue = newArrayForSongs(playlist);
    if (!args) page = 1;

    let embed = new Discord.RichEmbed() 
    .setTitle(`Server Queue For Server: ${message.guild.name}`)
    .setDescription(`\n__**Now Playing**__ \n\n \`0.\` [${nowPlaying.title}](${nowPlaying.url}) \`(${nowPlaying.hours}:${nowPlaying.minutes}:${nowPlaying.seconds}) - Requested by ${nowPlaying.requester}\` \n\n 📩 __**Playing Next**__ 📩 \n\n ${(playlist.length === 1) ? "No more songs are queued" : newServerQueue[(args) ? parseInt(page) : parseInt(page - 1)].map(songs => `\`${(page == 1) ? index++ : page * 10 + index++}.\` [${songs.title}](${songs.url}) | \`(${songs.hours}:${songs.minutes}:${songs.seconds}) - Requested by ${songs.requester}\``).join("\n\n")}`)
    .addField("__**Related Songs**__ ", `${related.items.map(related => `\`${relatedIndex++}.\` ${related.snippet.title}`).join("\n\n")}`, true)
    .addField("Queue Information", `**${playlist.length} songs Enqeued**`, true)
    .setFooter(`You are on page: ${page} / ${Math.floor(totalPages)}`)

    message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['q'],
    permLevel: 0
};
  
exports.help = {
    name: "queue",
    description: "This command will display a list of all songs currently queued for this server",
    usage: "queue <x>"
};