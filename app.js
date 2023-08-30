const dotenv = require("dotenv");

const express = require("express");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");
const fs = require("fs");

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.get("/", (req, res) => {
    // fs.readFile("./info.txt", (error, data) => {
    //     if (!error) {
    //         res.json(data);
    //         console.log(data);
    //     }
    // });

    // fs.open("koko.json", "w", (error, data) => {
    //     if (error) throw error;
    //     console.log("file has been created");
    // });
    fs.writeFile("koko.json", "{'name':'koko'}", (error) => {
        if (error) throw error;
        console.log("No error");
    });
});

app.listen(5000, () => {
    console.log(`Server is listening at http://localhost:5000`);
});
