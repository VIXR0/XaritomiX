const relatedFunc = require("../functions/related");

exports.run = (client, message, args, Discord) => {
    
    relatedFunc.setAndUpdate(client, message, args.join(" "));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: 0
};
  
exports.help = {
    name: "related",
    description: "Will allow you to interact with the related songs to your queue",
    usage: "related <x>"
};