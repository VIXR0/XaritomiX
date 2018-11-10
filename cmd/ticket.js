exports.run = (client, message, args) => {
	if(message.member.roles.find(val => val.name === '.')) return message.channel.send("You already have an open ticket!").then(msg => msg.delete(5000));

	function getID() {
		var uID = message.author.id;
		var newID = uID.substring(0, uID.length - 12);
		var chanName = message.author.username + "-" + newID;

		return chanName;
	}

	message.guild.createChannel(chanName(), 'text', [{
		id: message.guild.id,
		deny: ['READ_MESSAGES']
	}])
		//.then(channel => channel.setParent('CATEGORY ID HERE'))
		.catch(console.error);

	//message.member.addRole('ROLE ID HERE');
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "ticket",
    description: "This command creates a private ticket channel for the user.",
    usage: "!ticket"
};