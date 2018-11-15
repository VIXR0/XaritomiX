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
    ytapi.related(nowPlaying.id, 3,).then(result => {
        if (err) return;
        for (let i = 0; i < result.length; i++) {
            youtubeapi.getVideoByID(result.items[i].id.videoId, 1).then(rresult => {
                client.music.get(message.guild.id).related.push({
                    title: rresults.title,
                    url: `https://youtube.com/watch?v=${rresults.id}`,
                    id: rresults.id,
                    hours: rresults.duration.hours,
                    minutes: rresults.duration.minutes,
                    seconds: rresults.duration.seconds,
                    requester: message.guild.member(message.author).displayName
                });
            });
        }
    });
}

module.exports.setAndUpdate = (client, message, index) => {
    let nowPlaying = client.music.get(message.guild.id).songs[0];
    ytapi.related(nowPlaying.id, 5, function(err, result) {
        if(err) return; 
        if (!result) return; 
        youtubeapi.getVideoByID(result.items[index - 1].id.it).then(rresult => {
            client.music.get(message.guild.id).songs.push({
                title: rresults.title,
                url: `https://youtube.com/watch?v=${rresults.id}`,
                id: rresults.id,
                hours: rresults.duration.hours,
                minutes: rresults.duration.minutes,
                seconds: rresults.duration.seconds,
                requester: message.guild.member(message.author).displayName
            });

            playlistDB.findOne( {}, (err, playlist) => {
                if (err) return; 
                if (!result) return; 

                playlist.Songs = client.music.get(message.guild.id).songs;
                playlist.save().catch(err => console.log(err));
            })
        });
    });
}