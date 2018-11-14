const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/XaritomiX", { useNewUrlParser: true});

const licenses = mongoose.Schema({
    Key: String
});

module.exports = mongoose.model("Licenses", licenses);