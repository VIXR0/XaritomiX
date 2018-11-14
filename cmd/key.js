const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const settings = require("../models/Guild_settings");
const premium = require('../models/Premium_Users');
const license = require("../models/licences.key");

exports.run = (client, message, args, Discord) => {
    premium.findOne({UserID: message.author.id}, (err, user) => {
        if (err) return;
        console.log(user)
        if (user) {
            return message.channel.send(`Whoe there, it seems you are already a premium user.`)
        }
        if (!user) {
            license.findOne({Key: args.join(" ")},(err, key)=>{
                if (err) return; 
                if (!key) return message.channel.send(`I\'m sorry but \`${args.join(" ")}\` is not a valid key`);

                const newPremiumUser = new premium({
                    UserID: message.author.id,
                    Key: args.join(" ")
                })

                newPremiumUser.save().catch(err => console.log(err));
                message.channel.send(`\`${args.join(" ")}\` was a valid key. Thank you for supporting me. All premium features are now unlocked`)

                return license.findByIdAndDelete({ Key: args.join(" ")});
            });
        }
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "key",
    description: "Will allow a user to redeam a premium key",
    usage: "!poll <question>"
};