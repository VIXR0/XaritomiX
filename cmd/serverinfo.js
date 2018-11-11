exports.run = async (client, message, args, Discord) => {
	let sIcon = message.guild.iconURL;

	let serverEmbed = new Discord.RichEmbed()
	.setColor("0xffffff")
	.setThumbnail(sIcon)
	.setTitle("~ Server Information ~")
	.addField("Created", message.guild.createdAt, true)
	.addField("Guild ID", message.guild.id, true)
	.addField("Member Count", message.guild.memberCount, true)
	.addField("Region", message.guild.region, true);

	message.channel.send(serverEmbed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "serverinfo",
    description: "This command shows info about the current guild",
    usage: "!serverinfo"
};