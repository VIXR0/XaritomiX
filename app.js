const Discord = require("discord.js"); 
const client = new Discord.Client();
const fs = require("fs");
const dfsettings = require("./dfsettings.json");

client.music = new Map();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = new Discord.Collection();

fs.readdir("./cmd/", (err, files) => {
    if (err) console.error(err);
    console.log("============== | Commands | ==============");
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
      let props = require(`./cmd/${f}`);
      console.log(`Loading Command: ${props.help.name}. All Good`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
  });
  console.log("==========================================")
});

fs.readdir("./db/", (err, files) => {
    if (err) console.error(err);
    console.log("============= | DB Configs | =============");
    console.log(`Loading a total of ${files.length} db files`);
    files.forEach(f => {
        let propsTwo = require(`./db/${f}`);
        console.log(`Loading file ${propsTwo.help.name}. All Good`);
        client.db.set(propsTwo.help.name, propsTwo);
    });
    console.log("==========================================")
});

client.on("ready", () => {
    console.log("Ready!!");
});

client.on("guildCreate", guild => {
    client.db.get("Discord_Guilds").run(client, guild, "", "create");
});

client.on("message", message => {
    let guild = message.guild;
    if (message.guild === null) return;
    if (!message.content.startsWith(dfsettings.prefix)) return;
    let command = message.content.split(" ")[0].slice(dfsettings.prefix.length).toLowerCase();
    let args = message.content.split(" ").slice(1);
    // let perms = client.permissions(message);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    try {
        let cmd = require(`./cmd/${command}.js`);
    
        cmd.use(client, message, args, Discord, db);
      }
      catch (err) {}
});

client.isVoiceChannel = function(message) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");
    return voiceChannel;
}


client.login(dfsettings.TOKEN);