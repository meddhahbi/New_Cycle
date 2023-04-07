const jwt = require("jsonwebtoken");
const {User} = require("../Models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // console.log(token)
            // console.log(process.env.PK)

            //decodes token id
            const decoded = jwt.verify(token, process.env.PK);
            // console.log(decoded)

            req.user = await User.findById(decoded.id);
            // req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
