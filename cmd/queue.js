const settings = require("../dfsettings.json");
const youtube = require("youtube-node");
const ytapi = new youtube();
ytapi.setKey(settings.YTAPI);

exports.run = (client, message, args, Discord) => {
    const voicechannel = client.isVoiceChannel(message);
    if (!client.music.has(message.guild.id)) return; 
    const serverQueue = client.music.get(message.guild.id).songs;
    let index = 1, page = 1, totalPages, songArray;

    displayEmbed(message, chunkArray(serverQueue, 10), Discord, args.join(''), serverQueue);
    
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

function displayEmbed(message, serverQueue, Discord, args, playlist) {
    let page = args;
    let totalPages = serverQueue.length;
    let index = 1;
    let relatedIndex = 1; 
    let pageIndex = 10;
    let nowPlaying = serverQueue[0][0];
    let newServerQueue = newArrayForSongs(playlist);
    let relatedSongs = getRelatedSongs(nowPlaying.id);


    if (!args) page = 1;
    let embed = new Discord.RichEmbed() 
    .setTitle(`Server Queue For Server: ${message.guild.name}`)
    .setDescription(`\n__**Now Playing**__ \n ${nowPlaying.title} \n\n 📩 Playing Next 📩 \n ${newServerQueue[(args) ? parseInt(page) : parseInt(page - 1)].map(songs => `\`${(page == 1) ? index++ : page * 10 + index++}.\` [${songs.title}](${songs.url}) | \`(${songs.hours}:${songs.minutes}:${songs.seconds})Requested by ${songs.requester}\``).join("\n\n")} \n\n __**Related Songs**__ \n ${relatedSongs.map(related => `\`${relatedIndex++}.\` ${related.items.snippet.title}`).join("\n")} \n **${playlist.length} Enqeued**`)
    .setFooter(`You are on page: ${page} / ${Math.floor(totalPages)}`)

    message.channel.send(embed);
}

function newArrayForSongs(currentPlaylist) {
    let tempSongs = currentPlaylist; 
    tempSongs.shift();
    let newPlaylist = chunkArray(tempSongs, 10);
    return newPlaylist;
}

function getRelatedSongs(song) {
    ytapi.related(song, 5, function(error, result) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(JSON.stringify(result, null, 2));
          return JSON.parse(result);
        }
      });
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