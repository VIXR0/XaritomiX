cmd.run = (client, message, args, Discord, db) => {
    client.db.get("Discord_Guilds").run(client, message, args, "get");

    
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
