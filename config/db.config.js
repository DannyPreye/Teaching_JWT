// create a mongodatabase and link it
const mongoose = require("mongoose");
// install dotenv and link it
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = mongoose.createConnection(connectionString, options);

module.exports = connection;
