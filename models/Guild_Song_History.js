const mongoose = require("mongoose");

const songHistory = mongoose.Schema({
    GuildID: String,
    Songs: Array
});

module.exports = mongoose.model("Playlists", songHistory);