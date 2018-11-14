const keygen = require("keygen");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});
const license = require("../models/licences.key");
exports.run = (client, message, args, Discord) => {
    for (let i = 0; i < 10000; i++) {
        let newLicense = new license({
            Key: keygen.url(keygen.large) 
        })

        newLicense.save().catch(err => console.log(err));
        console.log(`Key # ${i} has been generated`);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "keygen",
    description: "This command will generate new keys",
    usage: ""
};
