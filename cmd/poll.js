cmd.run = (client, message, args, Discord, db) => {
	if (!args[0]) return message.channel.send("Usage: !poll <question>");

	let embed = new Discord.RichEmbed()
	.setColor('0xffffff')
	.setFooter('React To Vote!')
	.setDescription(args.join(' '))
	.setTitle(`Poll Created By ${message.author.username}`);

	let msg = await message.channel.send(embed);

	await msg.react('✅');
	await msg.react('❌');

	message.delete();
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};