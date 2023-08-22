const express = require("express");
const {
    createTodo,
    getAllTodoForUser,
    getSingleTodo,
    updateTodo,
    deleteTodo,
} = require("../controller/todo");
const route = express.Router();
const authMiddleWare = require("../middleware/auth");

route.post("/create", authMiddleWare, createTodo);
route.get("/user/:userId", authMiddleWare, getAllTodoForUser);
route.get("/:id", authMiddleWare, getSingleTodo);
route.patch("/:id", authMiddleWare, updateTodo);
route.delete("/:id", authMiddleWare, deleteTodo);

module.exports = route;
