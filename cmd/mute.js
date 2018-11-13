exports.run = async (client, message, args, Discord) => {
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let muteRole = message.guild.roles.find(role=> role.name === "Muted");

    if(!toMute) return message.channel.send('`You must specify a user!`');
    if(toMute.hasPermission("KICK_MEMBERS")) return message.channel.send('`I can\'t mute that member!`');

    if(!muteRole){
        try{
            muteRole = await message.guild.createRole({
                name: "Muted",
                color: "0xffffff",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack)
        }
    }

    let muteTime = args[1];
    if(!muteTime) return message.channel.send('`You didn\'t specify a time!`');

    await(toMute.addRole(muteRole.id));
    message.channel.send(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);

    setTimeout(function() {
        toMute.removeRoll(muteRole.id);
        message.channel.send(`<@${toMute.id}> has been unmuted.`);
    }, ms(muteTime));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "mute",
    description: "This command will mute the specified user with a set time.",
    usage: "mute <@> <time>"
};