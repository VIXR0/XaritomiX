const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const settings = require("../models/Guild_settings");
const premium = require('../models/Premium_Users');

exports.run = (client, message, args, Discord) => {
    let wordMatch = ['modchannel', 'conplay','prefix', 'modrole', 'adminrole', 'memberrole', 'muterole', 'musicrole', 'displaysonginchat', 'continuousplay'];
    let options = args[0];

    if (!options) {
        settings.findOne({ Server_ID: message.guild.id}, (err, result) => {
            if (err) return;
            if (!result) return;
            const settingsEmbed = new Discord.RichEmbed()
            .setTitle(`Server Settings for: **${message.guild.name}**`)
            .setColor()
            .setDescription(`

Prefix: **${result.Server_Prefix}**
Mod Channel: **${result.Server_Mod_Channel}**
Members Role: **${result.Server_Member_Role}**
Moderators Role **${result.Server_Moderator_Role}**
Administrators Role: **${result.Server_Admin_Role}**
Mute Role: **${result.Server_Mute_Role}**
Continuous Play: **${result.Server_Con_Play}**
Default Music Volume: **${result.Server_Default_Volume}**
Display Song Message: **${result.Server_Play_Next_Song_Message}**
`)
            .setFooter(`Requested by: ${message.member.user.username}#${message.member.user.discriminator}`)
            return message.channel.send( settingsEmbed );
        });
        
    }

    if (options) {
        for (let x = 0; x < wordMatch.length; x++) {
            if (options == wordMatch[x]) return runCommand(client, message, args, Discord, options);
        }     
        message.channel.send("Please provide a correct setting type");
    }
}

function runCommand(client, message, args, Discord, options) {

    if (options) {
        const ServerSettings = {
            modchannel: "Server_Mod_Channel",
            prefix: "Server_Prefix",
            modrole: "Server_Moderators_Role",
            adminrole: "Server_Admin_Role",
            memberrole: "Server_Member_Role",
            muterole: "Server_Mute_Role",
            conplay: "Server_Con_Play",
            musicvolume: "Server_Default_Volume",
            displaysonginchat: "Server_play_Next_Song_Message"
        }

        premium.findOne( {UserID: message.author.id}, (err, Presult) => {
            if (err) return;
            settings.findOne( { Server_ID: message.guild.id}, (err, result) => {
                if (err) return;
                if (!result) return;
                
                console.log(Presult);
                if (args[0] == 'conplay' && !Presult) {
                    return message.channel.send('I\'m sorry but that is a patron only feature');
                    
                }

                if (args[0] == 'conplay') {
                    if (client.music.get(message.guild.id).continuousPlay == true) {
                        client.music.get(message.guild.id).continuousPlay = false;
                        return message.channel.send(`**Continuous Play is now disabled**`);
                    } else {
                        client.music.get(message.guild.id).continuousPlay = true;
                        return message.channel.send(`**Continuous Play is now enabled**`);
                    } 
                }

                result[ServerSettings[args[0]]] = args[1];
                result.save().catch(err => console.log(err));
                message.channel.send(`You have successfully updated the setting: **${args[0]}** to **${args[1]}**`);
            });
        })
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