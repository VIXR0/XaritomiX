const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
        GuildID: String,
        Songs: Array
    });

module.exports = mongoose.model("Song_Playlists", playlistSchema)