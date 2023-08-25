const jwt = require("jsonwebtoken");
const todo = require("../model/todo");

function authMiddleWare(req, res, next) {
    const token = req.headers.authorization;

    const extract = token.split(" ");

    if (extract[0] === "Bearer") {
        try {
            const verifyToken = jwt.verify(extract[1], process.env.JWTSECRET);
            return next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "User is not authenticated",
            });
        }
    }
}

async function confirmUserSingleTodo(req, res, next) {
    const token = req.headers.authorization;
    const { id } = req.params;

    const extract = token.split(" ");

    if (extract[0] === "Bearer") {
        try {
            const convertPayload = atob(extract[1].split(".")[1]);
            const userObj = JSON.parse(convertPayload);

            const findTodo = await todo.findOne({ _id: id });

            console.log(findTodo.user.toString(), userObj.sub);
            if (findTodo.user.toString() === userObj.sub) {
                return next();
            }

            return res.status(404).json({
                success: false,
                message: "User is not authorized",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    }
}
module.exports = { authMiddleWare, confirmUserSingleTodo };
