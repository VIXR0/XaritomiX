const mongoose = require("mongoose");

const PremiumUsers = mongoose.Schema({
    UserID: String,
    Key: String
})

module.exports = mongoose.model("Premium", PremiumUsers)