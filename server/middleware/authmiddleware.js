const jwt = require("jsonwebtoken");
const {User} = require("../Models/User");
const {Association} = require("../Models/Association");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // console.log("token")
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

const protectAdmin = asyncHandler(async (req, res, next) => {
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

            req.user = await User.findOne({_id:decoded.id, role:"admin"});
            // console.log(req.user)
            if(req.user === null){
                res.status(401).send("not authorized, not an admin");
            }
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

const protectAssociation = asyncHandler(async (req, res, next) => {
    // let token;
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        // token = req.headers.authorization.split(" ")[1];

        console.log(token)
        // console.log(process.env.PK)

        //decodes token id
        const decoded = jwt.verify(token, process.env.PK);
        // console.log(decoded)

        req.user = await Association.findOne({_id: decoded.id});
        // console.log(req.user)
        if (req.user === null) {
            res.status(401).send("not authorized, not an association");
        }
        // req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }

});

module.exports = { protect, protectAdmin, protectAssociation };
