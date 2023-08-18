const connection = require("../config/db.config");
const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
    },
});

module.exports = connection.model("Todo", TodoSchema);
