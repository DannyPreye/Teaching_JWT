function authMiddleWare(req, res, next) {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated) {
        return next();
    }
    return res.status(400).json({
        success: false,
        message: "User is not authenticated",
    });
}
module.exports = authMiddleWare;
