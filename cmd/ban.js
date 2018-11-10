cmd.run = (client, message, args, Discord, db) => {
	let bReason = args.join(" ").slice(22);
    let bUser = message.guild.member(message.mentions.first() || message.guild.members.get(args[0]));

    if(!bUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have the correct permissions to execute this command!");
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("I am unable to ban that member!");
    if(!args[0] || args[0 == "help"]) return message.channel.send("Usage: !ban <user> <reason>");

    let banConfirm = new Discord.RichEmbed()
    .setDescription(`${bUser} has been kicked for ${bReason}`);

    message.guild.member(bUser).kick(bReason);
    message.channel.send(banConfirm)
    	.then(msg => msg.delete(5000));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "ban",
    description: "This command will ban the specified user from the guild with a set reason.",
    usage: "ban <@> <reason>"
};