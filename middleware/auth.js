const jwt = require("jsonwebtoken");

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
module.exports = authMiddleWare;
