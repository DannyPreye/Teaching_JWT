const dotenv = require("dotenv");

const express = require("express");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`);
});
