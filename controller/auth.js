const user = require("../model/user");
const { generatePassword, validatePassword } = require("../utils/helper");
const issueJWT = require("../utils/jwt");
const handleRegistration = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const findUser = await user.findOne({ email: email });

        if (findUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }
        const { hash, salt } = generatePassword(password);

        const newUser = new user({
            firstName: firstName,
            lastName: lastName,
            email: email,
            hash: hash,
            salt: salt,
        });

        const saveUser = await newUser.save();
        if (saveUser) {
            req.isAuthenticated = true;

            const token = issueJWT(saveUser);

            return res.status(201).json({
                success: true,
                token,
            });
        } else {
            return res.status(400).json({
                success: false,
                message:
                    "Unfortunately there was an error registering the user please try again",
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const findUser = await user.findOne({ email });

    try {
        if (!findUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const salt = findUser.salt;
        const hash = findUser.hash;

        if (!validatePassword(password, hash, salt)) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        req.isAuthenticated = true;
        const token = issueJWT(findUser);
        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};

const handleForget = async (req, res) => {};

module.exports = {
    handleForget,
    handleRegistration,
    handleLogin,
};
