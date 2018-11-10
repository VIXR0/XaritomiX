exports.run = async (client, message, args) => {
    client.db.get("Discord_Guilds").run(client, message, args, "get");

    
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: "get",
    description: "Will ping you",
    usage: "eval <command>"
};