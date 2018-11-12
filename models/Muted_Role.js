const mongoose = require("mongoose");

const mutedSchema = mongoose.Schema({
    mutedRole: String
});

module.exports = mongoose.model("Muted Role", mutedSchema);