const mongoose = require("mongoose");
cmd.run = (client, message, args, Discord, db) => {
    
    client.db.get("Discord_Guilds").run(client, message, args);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  