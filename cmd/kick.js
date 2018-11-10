<<<<<<< HEAD
const Discord = require('discord.js');
exports.run = (client, message, args) => {
=======
cmd.run = (client, message, args, Discord, db) => {
>>>>>>> da0735a4dbd13c46e64f16b0b8adf8d51d74aabf
	let kReason = args.join(" ").slice(22);
    let kUser = message.guild.member(message.mentions.first() || message.guild.members.get(args[0]));

    if(!kUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have the correct permissions to execute this command!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("I am unable to kick that member!");
    if(!args[0] || args[0 == "help"]) return message.channel.send("Usage: !kick <user> <reason>");

    let kickConfirm = new Discord.RichEmbed()
    .setDescription(`${kUser} has been kicked for ${kReason}`);

    message.guild.member(kUser).kick(kReason);
    message.channel.send(kickConfirm)
    	.then(msg => msg.delete(5000));
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
