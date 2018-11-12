const mongoose = require("mongoose");

const mutedSchema = mongoose.Schema({
    guildID: String,
    mutedRole: String
});

module.exports = mongoose.model("Muted Role", mutedSchema);