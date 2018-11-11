const arraySort = require('array-sort')
const table = require('table');

exports.run = async (client, message, args, Discord) => {
	let invites = await message.guild.fetchInvites();
	invites = invites.array();

	arraySort(invites, 'uses', { reverse: true });

	let possibleInvites = [['Member', 'Uses']];
	invites.forEach(function(invite) {
		possibleInvites.push([invite.inviter.username, invite.uses]);
	})

	const inviteEmbed = new Discord.RichEmbed()
	.setColor("0xffffff")
	.addField("~ Invites Leaderboard ~", `\`\`\`${table.table(possibleInvites)}\`\`\``);

	message.channel.send(inviteEmbed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "invites",
    description: "This command shows the invites leaderboard",
    usage: "!invites"
};