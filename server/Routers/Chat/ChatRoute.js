

const express = require("express");
const {Chat} = require("../../Models/Chat")
const {Message} = require("../../Models/Message")
const {User} = require("../../Models/User")
const { protect } = require("../../middleware/authmiddleware");
const router = express.Router();

router.route("/").get(protect, async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password -subscription")
            .populate("latestMessage")
            .populate("product")
            .sort({updatedAt:-1})
            .then(async (results) => {
                for(let result of results){
                    if(result.product){
                        result.populate("product")
                    }
                    else if(result.post){
                        result.populate("post")
                    }
                }
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

router.route("/post").get(protect, async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}, post: { $ne: null }})
            .populate("users", "-password -subscription")
            .populate("latestMessage")
            .populate("post")
            .sort({updatedAt:-1})
            .then(async (results) => {
                for(let result of results){
                        result.populate("post")
                }
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
        Chat.findOne({_id: req.params.chatId})
            // .populate("users", "name email")
            .then(async (results) => {
                const users = results.users;
                let other = null
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

router.route("/deal").put(protect, async (req, res)=>{
    try {
        let pos = null
        Chat.findOne({_id: req.body.chatId})
            .then(async (results) => {
                const users = results.users;
                pos = users.indexOf(req.user._id);
                // console.log(pos);
                // console.log(results);
                results.dealt[pos] = true;
                results.save()
                res.status(200).send(results);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

router.route("/deal/:chatId").get(protect, async (req, res)=>{
    try {
        let pos = null
        Chat.findOne({_id: req.params.chatId})
            .then(async (results) => {
                const users = results.users;
                pos = users.indexOf(req.user._id);
                const deal = results.dealt[pos]
                res.status(200).send(deal);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

router.route("/total_deal/:chatId").get(protect, async (req, res)=>{
    try {
        let pos = null
        Chat.findOne({_id: req.params.chatId})
            .then(async (results) => {
                const users = results.users;
                pos = users.indexOf(req.user._id);
                const deal = results.dealt[0] && results.dealt[1]
                res.status(200).send(deal);
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
router.route("/get_chat/:chat").get(protect, async (req, res)=>{
    try{
        await Chat.findOne({_id: req.params.chat})
            .populate("product")
            .populate("post")
            .then((c)=>{
                // if (c.product!==undefined){
                //     console.log("pr")
                //
                //     console.log(c)
                // }
                // else if (c.post!==undefined){
                //     c.populate("post")
                // }
            // console.log(c)
            res.send(c)
        })
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

router.route("/").post(protect, async (req, res) => {
    const {userId, productId, productName, postId, postName} = req.body;
    // console.log("productId")
    // console.log(productId)
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    let isChat;
    if(productId){
        isChat = await Chat.find({
            $and: [
                {users: {$elemMatch: {$eq: req.user._id}}},
                {users: {$elemMatch: {$eq: userId}}},
                {product: productId}
            ]
        })
            .populate("users", "-password -subscription -isBlocked -isActive -activationCode")
            .populate("latestMessage")
            .populate("product", "name")
    }
    else if(postId){
        isChat = await Chat.find({
            $and: [
                {users: {$elemMatch: {$eq: req.user._id}}},
                {users: {$elemMatch: {$eq: userId}}},
                {post:postId}
            ]
        })
            .populate("users", "-password -subscription -isBlocked -isActive -activationCode")
            .populate("latestMessage")
            .populate("ArticleAssociation");

    }


    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username email",
    });
    if (isChat.length > 0) {

        // if(isChat.dealt[0]===false || isChat.dealt[1]===false)
        // console.log(isChat[0])
        res.send(isChat[0]);
    } else {
        var chatData = productId?{
            chatName: "sender",
            users: [req.user._id, userId],
            product:productId
        }:postId?{
                chatName: "sender",
                users: [req.user._id, userId],
                post:postId
            }:{}
        ;
        try {
            const createdChat = await Chat.create(chatData).then(async (chat)=>{
                console.log(chat)
                let newMessage = productId?{
                    sender: req.user._id,
                    content: "hello! I am requesting to buy the product "+ productName,
                    chat: chat._id,
                }:postId?{
                    sender: req.user._id,
                    content: "hello! I am requesting to trade the product "+ postName,
                    chat: chat._id,
                }:{};
                try {
                    var message = await Message.create(newMessage);

                    message = await message.populate("sender", "username");
                    message = await message.populate("chat");
                    message = await User.populate(message, {
                        path: "chat.users",
                        select: "username email",
                    })
                    chat.latestMessage = message
                    chat.save();
                    // await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});

                    // res.json(chat);
                } catch (error) {
                    res.status(400);
                    throw new Error(error.message);
                }
            });
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password -subscription -isBlocked -isActive -activationCode"
            );
            // console.log(FullChat)
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})



module.exports = router;
