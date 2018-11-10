const Discord = require('discord.js');


module.exports = (client, message, args) => {
  message.delete();

  const pages = ['**__HELP COMMANDS__** \n------------------------------------------------------------------------------------------------- \n**Help** \nThis will give you a help direction. \n**Help?** \nFor more advanced help! \nThis also sends an emergency notification to the owner. \n**Rules** \nShow you the Rules. \n**List** \nList of administrators and moderators!',
    '**__GENERAL COMMANDS__** \n------------------------------------------------------------------------------------------------- \n**Donate** \nFeel free to support my first bot development. \n**Vote** \nGet you to the official website where you can **__Vote__** **__`Remember im still a beta!`__** \n**Invite** \nInvite me to your own server, **__`Remember im still a beta!`__** \n**Addfriend** \nThis gives you a link so you can invite friends to this server.\nLink comes in private message! \n**Serverinfo** \nInfo about discord server you are on. \n**Info** \nGeneral info about **__Support-bot__** \n**Pic** \nTake a selfie! \n**Ping** \nchecks the bots response time to Discord, then showing your Online Latency and API Latency. \n**Time** \nShows you the current date and time.',
    '**__FUNNY COMMANDS__** \n------------------------------------------------------------------------------------------------- \n**Poop** \nJust a super easy way of having some fun, Right? :poop: \n**Love** \nSend some love :heart: \n**lol** \nlol meme :laughing: \n**Meme** \nMeme :laughing:',
    '**__OTHER BOTS__** \n------------------------------------------------------------------------------------------------- \n**rpg** \nWill show you all IdleRPG commands! \n**Ghetto** \nThis shows you all the commands for **__[Ghetto-Bot]__** (Music-Bot)',
    '**__SUPPORT__** \n------------------------------------------------------------------------------------------------- \nNeed live support?? Join this channel [Live-Support](https://discord.gg/uYbGp8W)] \nNeed to check out Google?? There u go! [Google](http://google.com) , more will come in the future.'];

  let page = 0;
  let embed;

  function newEmbed(newPageNumber) {
    if (newPageNumber < 0) return;
    if (newPageNumber > 5) return;

    embed = new Discord.RichEmbed()
    .setColor(4588676)
    .setAuthor('Commands', `${message.client.user.avatarURL}`)
    .setTimestamp(new Date())
    .setDescription(`Welcome, Use the arrows to move to the next page. \n ${pages[newPageNumber - 1]}`)
    .setFooter(`Page ${newPageNumber} of ${pages.length}`)
    .setTimestamp(new Date());
    if (newPageNumber === 0) {
        embed.setImage('http://hdqwalls.com/wallpapers/purple-nebula-4k-lu.jpg');
    }
    return embed;
  }

  message.channel.send(newEmbed(page)).then((msg) => {
    msg.react('⬅').then(() => {
      msg.react('➡');

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;


      const backwards = msg.createReactionCollector(backwardsFilter, { time: 0 });

      const forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });


      backwards.on('collect', () => {   
        msg.edit(newEmbed(page--));
      });

      forwards.on('collect', () => {
        msg.edit(newEmbed(page++));
      });
    });
  });
};