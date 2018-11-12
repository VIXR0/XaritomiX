const mongoose = require("mongoose");

let playlistSchema;
try {
    playlistSchema = mongoose.Schema("Playlists", {
        GuildID: String,
        Songs: Array
    });
}catch(err) {
    playlistSchema = mongoose.model("Playlists")
}


module.exports = playlistSchema;