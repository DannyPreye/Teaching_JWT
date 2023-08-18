const connection = require("../config/db.config");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
});

module.exports = connection.model("User", UserSchema);
