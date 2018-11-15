exports.run = (client, message, index, Discord) => {
    if (!index) return message.channel.send("Please provide a number");
    let nowPlaying = client.music.get(message.guild.id).songs[0];
    ytapi.related(nowPlaying.id, 5, function(error, result) {
        if (error) return;
        updatePlaylist(client, message, index, Discord, result);
    });
}

function updatePlaylist(client, message, args, Discord, result) {
    youtubeapi.getVideoByID(result.items[args - 1].id.videoId).then(rresults => {
        client.music.get(message.guild.id).songs.push({
            title: rresults.title,
            url: `https://youtube.com/watch?v=${rresults.id}`,
            id: rresults.id,
            hours: rresults.duration.hours,
            minutes: rresults.duration.minutes,
            seconds: rresults.duration.seconds,
            requester: message.guild.member(message.author).displayName
        });

        addSongPlaylistDB(message, client.music.get(message.guild.id).songs);
        message.channel.send(`**${rresults.title}** (${rresults.duration.hours}:${rresults.duration.minutes}:${rresults.duration.seconds}) has been added to the queue`);
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