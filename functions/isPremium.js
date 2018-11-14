const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const premiumUsers = require("../models/Premium_Users");

module.exports.isPremium = function(message) {
    premiumUsers.findOne( {UserID: message.author.id}, (err, user) => {
        if (err) return;
        if (!user) return message.channel.send("This is a patron only command");
    });
    return true;
}