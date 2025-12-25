const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    email: {type: String, unique: true},
    password: String
});

const userMondel = mongoose.model("users", userSchema);

module.exports = userMondel;