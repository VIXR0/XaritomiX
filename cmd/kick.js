<<<<<<< HEAD
exports.run = (client, message, args, Discord) => {
=======
<<<<<<< HEAD
const Discord = require('discord.js');
exports.run = (client, message, args) => {
=======
cmd.run = (client, message, args, Discord, db) => {
>>>>>>> da0735a4dbd13c46e64f16b0b8adf8d51d74aabf
>>>>>>> ac4c4fe45df4fe739c806a68e7b4520a5114bf81
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

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "kick",
    description: "This command will the specified user from the guild with a set reason.",
    usage: "kick <@> <reason>"
};