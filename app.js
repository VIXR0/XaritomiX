const Discord = require("discord.js"); 
const client = new Discord.Client();
const fs = require("fs");
const dfsettings = require("./dfsettings.json");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/XaritomiX', { useNewUrlParser: true});
const guildSettingsDB = require("./models/Guild_settings");

client.music = new Map();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = new Discord.Collection();

fs.readdir("./cmd/", (err, files) => {
    if (err) console.error(err);
    console.log("============== | Commands | ==============");
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
      let props = require(`./cmd/${f}`);
      console.log(`Loading Command: ${props.help.name}. All Good`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
  });
  console.log("==========================================")
});

client.on("ready", () => {
    console.log("Ready!!");
});

client.on("guildCreate", guild => {
    addGuildSetting(guild);
});

client.on("message", message => {
    let prefix;
    if (message.guild === null) return;

    guildSettingsDB.findOne({ Server_ID: message.guild.id}, (err, guild) => {
        if (err) return; 
        if (!guild) {
            addGuildSetting(message.guild);
        } else {
            let prefix = guild.Server_Prefix;
            if (!message.content.startsWith(prefix)) return;
            let command = message.content.split(" ")[0].slice(prefix.length).toLowerCase();
            let args = message.content.split(" ").slice(1);
            // let perms = client.permissions(message);
            let cmd;
            if (client.commands.has(command)) {
                cmd = client.commands.get(command);
            } else if (client.aliases.has(command)) {
                cmd = client.commands.get(client.aliases.get(command));
            }
            if (cmd) {
                // if (perms < cmd.conf.permLevel) return message.channel.send(`Im sorry, but this command requires a permission level of ${cmd.conf.permLevel} or higher.`);
            cmd.run(client, message, args, Discord);
            }
        }
    });

});

client.isVoiceChannel = function(message) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");
    return voiceChannel;
}

function addGuildSetting(guild) {
    guildSettingsDB.findOne({ Server_ID: guild.id}, (err, guildSettings) => {
        if (err) return;
        if (guildSettings) return; 

        const newGuild = new guildSettingsDB({
            Server_Name: guild.name,
            Server_ID: guild.id,
            Server_Mod_Channel: "ModLogs",
            Server_Prefix: "!",
            Server_Moderator_Role: "Moderators",
            Server_Admin_Role: "Administrator",
            Server_Member_Role: "Members",
            Server_Mute_Role: "Muted",
            Server_Default_Volume: "100", 
            Server_Play_Next_Song_Message: true
        });

        newGuild.save().catch(err => console.log(err));
    });
}


client.login(dfsettings.TOKEN);