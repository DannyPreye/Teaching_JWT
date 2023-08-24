const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const issueJWT = (user) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeStamp = currentTime + 24 * 60 * 60;

    const _id = user._id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;

    const payload = {
        sub: _id,
        exp: timeStamp,
        iat: Date.now(),
        firstName,
        lastName,
        email,
    };

    const signToken = jwt.sign(payload, process.env.JWTSECRET);

    return {
        token: `Bearer ${signToken}`,
    };
};

module.exports = issueJWT;
