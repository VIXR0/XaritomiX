const settings = require("../dfsettings.json");
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(settings.YTAPI);
const ytdl = require("ytdl-core");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/XaritomiX', { useNewUrlParser: true});
const playlistDB = require("../models/Guild_playlist");
const relatedFunc = require("../functions/related");

exports.run = async (client, message, args, perms, Discord) => {
    // Checks that the user is in the voice channel, if not then return
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");
    
    // Checks that the bot has permission to connect and speak in the selected voicechannel.
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to the voice channel, please make sure i have the right permissions");
    if(!permissions.has("SPEAK")) return message.channel.send("I cannot speak in this voice channel, please make sure i have the correct permissions");

    // This is the variable that stored the LINK / Key terms from the user | Will also check to see if it's empty
    let songRequest = args.join(" ");
    if (!songRequest) return message.reply("Please provide a youtube link or a search term");
    
    (!songRequest.includes("https")) ? getVideosByTerm(message, songRequest, client, voiceChannel) : getVideosByID(message, songRequest, client, voiceChannel);

}

function getVideosByTerm(message, songRequest, client, voiceChannel) { 
    youtube.searchVideos(songRequest,5).then(results => {
        displaySongSelectionMessage(message, results, client, voiceChannel);
    }).catch(console.log);

}

function getVideosByID(message, songRequest, client, voiceChannel) { 

    if (songRequest.includes('playlist')) return checkandplay(message, songRequest, client, voiceChannel, true)

    youtube.searchVideos(songRequest,1).then(results => {
        displaySongSelectionMessage(message, results, client, voiceChannel);
    }).catch(console.log);

}

async function displaySongSelectionMessage(message, songs, client, voiceChannel) {
    
    let index = 0;

    if (songs.length == 1) {
        index++;
        return updateSongQueue(message, index, songs, client, voiceChannel);
    }

    const embed = {
        "title": `Song selection for: ${message.guild.name}`,
        "description": `${songs.map(result => `${++index}.) - [${result.title}](https://www.youtube.com/watch?v=${result.id})`).join("\n\n")} \n\n __Please select a song by typing a number between 1 & 5__`,
        "color": 11576603
      };
    message.channel.send({ embed });
    try {
        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6 || msg2.content == "cancel", {
            maxMatches: 1,
            time: 10000,
            error: ['time']
        });
    } catch(error) {
        message.channel.send(`No value was given, cancelling the search`);
    }

    if (response.first().content == "cancel") return message.channel.send(`Search has been **CANCELLED**`);

    videoIndex = parseInt(response.first().content);
    updateSongQueue(message, videoIndex, songs, client, voiceChannel);
}

async function updateSongQueue(message, index, songs, client, voiceChannel) {

    const duration = await youtube.getVideoByID(songs[index - 1].id);

    song = {
        title: songs[index - 1].title,
        url: `https://youtube.com/watch?v=${songs[index - 1].id}`,
        id: songs[index - 1].id,
        hours: duration.duration.hours,
        minutes: duration.duration.minutes,
        seconds: duration.duration.seconds,
        requester: message.guild.member(message.author).displayName
    };

    checkandplay(message, song, client, voiceChannel)
}

async function checkandplay(message, song, client, voiceChannel, isPlaylist) {
    if (!client.music.has(message.guild.id)) {
        client.music.set(message.guild.id, {
            dispatcher: null,
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            isLoading: false,
            isPLaying: false,
            relatedSongs: [],
            continuousPLay: false
        });
        if (client.music.get(message.guild.id).isLoading == true) return message.channel.send("Please wait for the playlist to load");
        if (isPlaylist) {
            try {
                var connection = await voiceChannel.join();
                message.channel.send(`Joining **${voiceChannel.name}** with a bitrate of **${voiceChannel.bitrate} Bits**`);
                client.music.get(message.guild.id).connection = connection;
                return getPlaylist(message, song, client);
            } catch(err) {
                client.music.delete(message.guild.id);
                console.log(`There was an error: ${err}`);
            }
            
        }

        client.music.get(message.guild.id).songs.push(song);

        try {
            var connection = await voiceChannel.join();
            message.channel.send(`Joining **${voiceChannel.name}** with a bitrate of **${voiceChannel.bitrate} Bits**`);
            client.music.get(message.guild.id).connection = connection;
            play(client, message, message.guild, client.music.get(message.guild.id).songs[0]);
            addSongPlaylistDB(message, client.music.get(message.guild.id).songs);
        } catch (err) {
            client.music.delete(message.guild.id);
            console.log(`There was an error: ${err}`);
        }

    } else {
        if (client.music.get(message.guild.id).isLoading == true) return message.channel.send("Please wait for the playlist to load");
        if (isPlaylist) return getPlaylist(message, song, client);
        client.music.get(message.guild.id).songs.push(song);
        addSongPlaylistDB(message, client.music.get(message.guild.id).songs);
        message.channel.send(`**${song.title}** (${song.hours}:${song.minutes}:${song.seconds}) has been added to the queue`);
    }
    
}

async function getPlaylist(message, songRequest, client) {
    let gotFirstSong = false;
    const playlist = await youtube.getPlaylist(songRequest); 
    const videos = await playlist.getVideos();
    client.music.get(message.guild.id).isLoading = true;

    message.channel.send(`Found and added \`${videos.length}\` songs from \`${playlist.title}\` **NOTE** This will take a moment`);
    for (i in videos) {
        const duration = await youtube.getVideoByID(videos[i].id);
        client.music.get(message.guild.id).songs.push({

        title: videos[i].title,
        url: `https://youtube.com/watch?v=${videos[i].id}`,
        id: videos[i].id,
        hours: duration.duration.hours,
        minutes: duration.duration.minutes,
        seconds: duration.duration.seconds,
        requester: message.guild.member(message.author).displayName

        });

        if (!gotFirstSong) {
            gotFirstSong = true;
            if (client.music.get(message.guild.id).isPlaying === true) return addSongPlaylistDB(message, client.music.get(message.guild.id).songs);
            play(client, message, message.guild, client.music.get(message.guild.id).songs[0]);
            addSongPlaylistDB(message, client.music.get(message.guild.id).songs);
        }

        console.log(`Loaded: ${videos[i].title} ${i}`);
    }
}

function play(client, message, guild, song) {
    const serverQueue = client.music.get(guild.id);
    client.music.get(message.guild.id).isLoading = false;
    client.music.get(message.guild.id).isPlaying = true;

    if (!song) {
        serverQueue.voiceChannel.leave();
        client.music.delete(message.guild.id);
        return message.channel.send("Queue Concluded");
    }

    message.channel.send(`Now playing **${song.title}** (${song.hours}:${song.minutes}:${song.seconds}) -- Requested by ${song.requester}`);
    const dispatcher = serverQueue.connection.playStream(ytdl(`${song.url}`));
    serverQueue.dispatcher = dispatcher;
    dispatcher.setVolume(serverQueue.volume / 100);

    dispatcher.on("end", () => {
        if (client.music.get(message.guild.id).continuousPlay) {
            relatedFunc.run(client, message, Math.floor(Math.random() * 5) + 1);
        }
        client.music.get(message.guild.id).songs.shift();
        setTimeout(() => {
             play(client, message, guild, client.music.get(message.guild.id).songs[0]);
             addSongPlaylistDB(message, serverQueue.songs);
        }, 500);
    });
}

function addSongPlaylistDB(message, SongPlaylist) {

    playlistDB.findOne({GuildID: message.guild.id}, (err, guild) => {
        if (err) console.log(err);
        if (!guild) {
            const playlist = new playlistDB({
                GuildID: message.guild.id,
                Songs: SongPlaylist
            });

            playlist.save().catch(err => console.log(err));
        } else {
            guild.Songs = SongPlaylist;
            guild.save().catch(err => console.log(err));
        }
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "play",
    description: "Will play a song from youtube",
    usage: "play <LINK | Key Term>"
};