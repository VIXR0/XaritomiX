const mongoose = require("mongoose");

const guildSettings = mongoose.Schema({
    Server_Name: String,
    Server_ID: String,
    Server_Mod_Channel: String,
    Server_Prefix: String,
    Server_Moderator_Role: String,
    Server_Admin_Role: String,
    Server_Member_Role: String,
    Server_Mute_Role: String,
    Server_Con_Play: Boolean,
    Server_Default_Volume: Number, 
    Server_Play_Next_Song_Message: Boolean,
    Date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Guilds", guildSettings);