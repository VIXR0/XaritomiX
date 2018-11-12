const settings = require("../dfsettings.json");
const mongoose = require("mongoose");
exports.run = async (client, guildName, args, option) => {
    mongoose.connect('mongodb://localhost/XaritomiX', { useNewUrlParser: true})
        .then(() => console.log("Connected to the database"))
        .catch(err => message.channel.send(`There was an error connecting to the database: ${err}`));
    const Connection = establishConnToDB("discord_servers");

    

    if (option == "get") {
        const result = getDiscordServer(Connection, guildName);
        message.channel.send(result);
    } 

    if (option == "create") {
        try {
            const result = addDiscordServer(Connection, guildName);
        } catch(err) {
            console.error(err);
        }
        return;
    }

    
}

async function getDiscordServer(Options, guildName) {
    try {
        const dbResult = await Options
            .find({ Server_ID: guildName.id});
        message.channel.send(dbResult);
        } catch (err) {
            return message.channel.send(err);
    }
}

async function addDiscordServer(Option, guildName) {
    const discordServer = new Option({
                Server_Name: guildName.name,
                Server_ID: guildName.id,
                Server_Prefix: settings.prefix,
                Server_Mod_Channel: settings.modChannel,
                Server_Moderator_Role: settings.modRole,
                Server_Admin_Role: settings.adminRole,
                Server_Member_Role: settings.memberRole,
                Server_Default_Volume: 200, 
                Server_Play_Next_Song_Message: true,
                Server_User_Data: {}
    });
    try {
        const result = await discordServer.save();
        console.log(result);   
    } catch (err) {
        console.log(err);
    }
}
function establishConnToDB(name) {
    let options;
    if (name == "discord_servers") {
        try {
            options = mongoose.model('discord_servers', mongoose.Schema({
                Server_Name: String,
                Server_ID: String,
                Server_Prefix: String,
                Server_Mod_Channel: String,
                Server_Moderator_Role: String,
                Server_Admin_Role: String,
                Server_Member_Role: String,
                Server_Default_Volume: Number, 
                Server_Play_Next_Song_Message: Boolean,
                Server_User_Data: Array,
                Date: { type: Date, default: Date.now() }
            }));
        } catch (err) {
            options = mongoose.model('discord_servers');
        }
    }

    return options;
}

exports.help = {
    name: "Discord_Guilds"
}