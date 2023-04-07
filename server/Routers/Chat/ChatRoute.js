const express = require("express");
const {Chat} = require("../../Models/Chat")
const {User} = require("../../Models/User")
const { protect } = require("../../middleware/authmiddleware");
const router = express.Router();

router.route("/").get(protect, async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password -subscription")
            .populate("latestMessage")
            .sort({updatedAt:-1})
            .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "username email",
            });
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
router.route("/get_other/:chatId").get(protect, async (req, res)=>{
    try {
        console.log(req.user)
        Chat.findOne({_id: req.params.chatId})
            .populate("users", "-password -subscription")
            .sort({updatedAt:-1})
            .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "username email",
            })
                const users = results.users;
                let other = null
                console.log(users)
                for (const client of users){
                    other = client._id !== req.user._id?client:null;


                }
                res.status(200).send(other);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

router.route("/get_readMessages/:chatId").get(protect, async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password -subscription")
            .sort({updatedAt:-1})
            .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "username email",
            })
                const users = results.users;
                let other = null
                console.log(users)
                for (const client of users){
                    other = client._id !== req.user._id?client:null;


                }
                res.status(200).send(other);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

router.route("/").post(protect, async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})



module.exports = router;
