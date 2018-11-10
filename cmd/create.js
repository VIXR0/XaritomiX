const mongoose = require("mongoose");
exports.run = (client, message, args, Discord) => {
    
    client.db.get("Discord_Guilds").run(client, message, args);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "create",
    description: "Will ping you",
    usage: "eval <command>"
  };