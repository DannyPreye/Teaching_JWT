const express = require("express");
const {
    createTodo,
    getAllTodoForUser,
    getSingleTodo,
    updateTodo,
    deleteTodo,
} = require("../controller/todo");
const route = express.Router();
const { authMiddleWare, confirmUserSingleTodo } = require("../middleware/auth");

route.post("/create", authMiddleWare, createTodo);
route.get("/user/:userId", authMiddleWare, getAllTodoForUser);
route.get("/:id", authMiddleWare, confirmUserSingleTodo, getSingleTodo);
route.patch("/:id", authMiddleWare, confirmUserSingleTodo, updateTodo);
route.delete("/:id", authMiddleWare, confirmUserSingleTodo, deleteTodo);

module.exports = route;
