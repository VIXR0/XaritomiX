const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const premiumUsers = require("../models/Premium_Users");

class isPremium {
    static check(client, message) {
        premiumUsers.findOne( {UserID: message.author.id}, (err, user) => {
            if (err) return;
            if (!user) return message.channel.send("This is a patron only command");
            setTimeout(() => {
                if (user) client.premium.set(message.guild.id, {
                    isPremium: true
                });
            }, 500);
        });
    }
}

module.exports = isPremium;