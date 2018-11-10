cmd.run = (client, message, args, Discord, db) => {
	if(message.member.roles.find(val => val.name === '.')) return message.channel.send("You already have an open ticket!").then(msg => msg.delete(5000));

	function getID() {
		var uID = message.author.id;
		var newID = uID.substring(0, uID.length - 12);
		var chanName = message.author.username + "-" + newID;

		return chanName;
	}

	message.guild.createChannel(`${getID()}`, 'text', [{
		id: message.guild.id,
		deny: ['READ_MESSAGES']
	}])
		//.then(channel => channel.setParent('CATEGORY ID HERE'))
		.catch(console.error);

	message.member.addRole('510742129006477344');
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};