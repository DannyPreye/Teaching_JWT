const dotenv = require("dotenv");

const express = require("express");
const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`);
});
