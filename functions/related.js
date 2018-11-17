// Requiring settings §
const settings = require("../dfsettings.json");

const YouTube = require('simple-youtube-api');
const youtubeapi = new YouTube(settings.YTAPI);

const youtube = require("youtube-node");
const ytapi = new youtube();
ytapi.setKey(settings.YTAPI);

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/XaritomiX', { useNewUrlParser: true});
const playlistDB = require("../models/Guild_playlist");

module.exports.getAndUpdate = (client, message, index) => {
    let nowPlaying = client.music.get(message.guild.id).songs[0]; 
    ytapi.addParam('videoType', 'music');
    ytapi.related(nowPlaying.id, 10, function(err, result) {
        if (err) return console.log(err);
        for (let i = 0; i < result.items.length; i++) {
            youtubeapi.getVideoByID(result.items[i].id.videoId, 1).then(rresults => {
                client.music.get(message.guild.id).relatedSongs.push({
                    title: rresults.title,
                    url: `https://youtube.com/watch?v=${rresults.id}`,
                    id: rresults.id,
                    hours: rresults.duration.hours,
                    minutes: rresults.duration.minutes,
                    seconds: rresults.duration.seconds,
                    requester: message.guild.member(message.author).displayName
                });
            }).catch(err => console.log(err));
        }
    });
}

module.exports.setAndUpdate = (client, message, index) => {
    let song = client.music.get(message.guild.id).tempRSongs;
    youtubeapi.getVideoByID(song[index - 1].id).then(rresults => {
        client.music.get(message.guild.id).songs.push({
            title: rresults.title,
            url: `https://youtube.com/watch?v=${rresults.id}`,
            id: rresults.id,
            hours: rresults.duration.hours,
            minutes: rresults.duration.minutes,
            seconds: rresults.duration.seconds,
            requester: message.guild.member(message.author).displayName
        });

        message.channel.send(`**${rresults.title}** (${rresults.duration.hours}:${rresults.duration.minutes}:${rresults.duration.seconds}) has been added to the queue`);

        playlistDB.findOne( { GuildID: message.guild.id }, (err, playlist) => {
            if (err) return; 
            if (!playlist) return; 
            playlist.Songs = client.music.get(message.guild.id).songs;
            playlist.save().catch(err => console.log(err));
        });
    });
}

module.exports.getTempRSongs = (client, message) => {
    let nowPlaying = client.music.get(message.guild.id).songs[0];
    client.music.get(message.guild.id).tempRSongs = [];
    ytapi.related(nowPlaying.id, 5, (err, result) => {
        if (err) return; 
        if (!result) return;
        for (let i = 0; i < result.items.length; i++) {
            client.music.get(message.guild.id).tempRSongs.push({
                title: result.items[i].snippet.title,
                id: result.items[i].id.videoId
            })
        }
    })
}