cmd.run = (client, message, args, Discord, db) => {
	if (isNaN(args[0])) return message.channel.send('**Please supply a valid amount of messages to purge**');
	if (args[0] > 200) return message.channel.send('**Please supply a number less than 200**');

	message.channel.bulkDelete(args[0])
		.then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete(5000)))
		.catch(err => console.log(err));
}

cmd.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};