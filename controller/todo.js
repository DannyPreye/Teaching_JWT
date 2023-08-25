const { model } = require("mongoose");
const todo = require("../model/todo");
const user = require("../model/user");
const createTodo = async (req, res) => {
    const { userId, title, description } = req.body;

    console.log(userId);
    try {
        if (!userId) {
            return res.status(404).json({
                message: "User id field is required",
                success: false,
            });
        }

        const findUser = await user.findOne({
            _id: userId,
        });

        // console.log("hello", findUser);

        if (!findUser) {
            return res.status(404).json({
                message: "User is not found",
                success: false,
            });
        }

        const createNewTodo = new todo({
            user: userId,
            title: title,
            description: description,
        });

        const saveTodo = await createNewTodo.save();

        if (saveTodo) {
            return res.status(201).json({
                message: "Todo has been created",
                success: true,
            });
        } else {
            return res.status(400).json({
                message: "An error occured",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const getSingleTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const findTodo = await todo.findOne({
            _id: id,
        });

        if (!findTodo) {
            return res.status(404).json({
                message: "Todo no found",
                success: false,
            });
        }

        res.status(200).json({
            data: findTodo,
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const getAllTodoForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const findTodo = await todo.find({ user: userId });
        if (!findTodo) {
            return res.status(404).json({
                message: "No todo found for this user",
                success: false,
            });
        }

        const allTodo = await todo.find({});
        return res.status(200).json({
            data: findTodo,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;

    const { title, description, completed } = req.body;

    try {
        const findTodo = await todo.findOne({
            _id: id,
        });

        if (!findTodo) {
            return res.status(404).json({
                message: "No todo found for this user",
                success: false,
            });
        }

        const updateTodo = await todo.findOneAndUpdate(
            { _id: id },
            {
                title: title || findTodo.title,
                description: description || findTodo.description,
                completed: completed || findTodo.completed,
            },
            { new: true }
        );

        return res.status(200).json({
            data: updateTodo,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todoWithId = await todo.findOne({ _id: id });

        if (!todoWithId) {
            return res.status(404).json({
                message: "No todo found for this user",
                success: false,
            });
        }

        const del = await todo.findOneAndDelete({ _id: id });

        res.status(200).json({
            message: "Todo has been deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

module.exports = {
    createTodo,
    getAllTodoForUser,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};
