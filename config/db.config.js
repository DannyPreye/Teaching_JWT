const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = mongoose.createConnection(connectionString, options);

module.exports = connection;
