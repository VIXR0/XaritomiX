const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const settings = require("../models/Guild_settings");

exports.run = (client, message, args, Discord) => {
    let options = args.join(" ")
    if (!options) {
        settings.findOne({ Server_ID: message.guild.id}, (err, result) => {
            if (err) return;
            if (!result) return;
            const settingsEmbed = new Discord.RichEmbed()
            .setTitle(`Server Settings for: **${message.guild.name}**`)
            .setDescription(`

Prefix: **${result.Server_Prefix}**
Mod Channel: **${result.Server_Mod_Channel}**
Members Role: **${result.Server_Member_Role}**
Moderators Role **${result.Server_Moderator_Role}**
Administrators Role: **${result.Server_Admin_Role}**
Mute Role: **${result.Server_Mute_Role}**
Default Music Volume: **${result.Server_Default_Volume}**
Display Song Message: **${result.Server_Play_Next_Song_Message}**
`)
            .setFooter(`Requested by: ${message.member.user.username}`)
            return message.channel.send( settingsEmbed );
        });
        
    }

    if (options) {
        const ServerSettings = {
            modchannel: "Server_Mod_Channel",
            prefix: "Server_Prefix",
            modrole: "Server_Moderators_Role",
            adminrole: "Server_Admin_Role",
            memberrole: "Server_Member_Role",
            muterole: "Server_Mute_Role",
            musicvolume: "Server_Default_Volume",
            displaysonginchat: "Server_play_Next_Song_Message"
        }

        settings.findOne( { Server_ID: message.guild.id}, (err, result) => {
            if (err) return;
            if (!result) return;

            result[ServerSettings[args[0]]] = args[1];
            result.save().catch(err => console.log(err));
            message.channel.send(`You have successfully updated the setting: **${args[1]}** `)
        });
    }      
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "settings",
    description: "This command will allow you to update settings for your guild",
    usage: "settings <Setting You Would Like to Change> (Value)"
};