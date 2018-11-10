exports.run = (client, message, args, Discord) => {

    message.guild.createChannel(`ticket-` + message.author.username).then(async ticketchannel => {
        if (!message.guild.id == "472730249176678420") return;

        let devTeam = message.guild.roles.get("510767150005485578")
        let supportRep = message.guild.roles.get("510773449988374528")
        ticketchannel.overwritePermissions(administrationTeam, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true
        })
        ticketchannel.overwritePermissions(message.guild.defaultRole, {
          VIEW_CHANNEL: false
        })
        let ticketCreatedEmbed = new discord.RichEmbed()
          .setColor("#43b2d6")
          .setTitle("Ticket - Ticket created")
          .setDescription("Your ticket has been created, you may visit it below")
          .addField("Ticket Channel", ticketchannel);
    
        await ticketchannel.setTopic(message.author.id)
        await message.channel.send(ticketCreatedEmbed)
        await ticketchannel.setParent("510773925211275270")
    
        let welcomeEmbed = new discord.RichEmbed()
          .setColor("#43b2d6")
          .setTitle("Ticket - Welcome to your ticket")
          .setDescription("Please choose the ticket type, please react with the staff needed to help you!\n\n:tools: - To Speak to a Member of the Development Team\n:globe_with_meridians: - Speak to a Member of Support Team\n:x: - Close your ticket")
    
        ticketchannel.send(welcomeEmbed).then(async welEmb => {
          await welEmb.react(":tools:")
          await welEmb.react(":globe_with_meridians:")
          await welEmb.react(":x:")
          setTimeout(function() {
            ticketchannel.overwritePermissions(message.member, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true
            })
            ticketchannel.send(`${message.author}`).then(msg => msg.delete())
          }, 2 * 1000);
          const filter = (reaction, user) => reaction.emoji.name === "" || reaction.emoji.name === ":globe_with_meridians:" || reaction.emoji.name === ":x:";
          welEmb.awaitReactions(filter, {
            maxUsers: 2
          }).then(collected => {
            welEmb.delete()
            let emojiname = collected.map(x => x._emoji)
            let emojiiname = emojiname.map(x => x.name)
            let emojireaction = emojiname.map(x => x.reaction)
            let count = emojireaction.map(x => x.count)
            count.shift()
            emojiiname.shift()
    
            let emojisting = emojiiname.toString()
            let countsting = count.toString()
    
            switch (emojisting) {
              case ":tools:":
                ticketchannel.send("Our Development Team will be with you shortly!" + " " + devTeam)
                ticketchannel.overwritePermissions(devTeam, {
                  VIEW_CHANNEL: true,
                  SEND_MESSAGES: true,
                  ATTACH_FILES: true
                })
                break;
              case ":globe_with_meridians:":
              ticketchannel.send("Our Support Team will be with you shortly!" + " " + supportRep)
              ticketchannel.overwritePermissions(supportRep, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true
              })
                break;
              case ":x:":
                ticketchannel.delete()
                break;
              default:
                ticketchannel.delete()
                break;
    
            }
          })
        })
      })
}