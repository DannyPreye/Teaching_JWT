// const UserSchema = require("../model/user");
const express = require("express");
const { handleRegistration, handleLogin } = require("../controller/auth");

const route = express.Router();

route.post("/register", handleRegistration);
route.post("/login", handleLogin);

module.exports = route;
