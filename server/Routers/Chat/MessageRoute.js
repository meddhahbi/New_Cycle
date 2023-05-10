const express = require("express");
const {Chat} = require("../../Models/Chat")
const {Message} = require("../../Models/Message")
const {User} = require("../../Models/User")
const { protect } = require("../../middleware/authmiddleware");
const router = express.Router();
const Filter = require('bad-words')
const filter = new Filter({ placeHolder: 'x'});

const os = require('os');








router.route("/").post(protect, async (req, res)=> {
    // console.log(req.user)
    let {content, chatId} = req.body;

    // console.log(content)
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "username");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "username email",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

router.route("/:chatId").get(protect,async (req, res) => {
    // const { page, limit } = req.query;
    // console.log("page")
    // console.log(page)
    const interfaces = os.networkInterfaces();
    const addresses = [];
    try {
        let laptopIp;

        // for (const n in interfaces) {
        //     for (const iface of interfaces[n]) {
        //         if (iface.family === 'IPv4' && !iface.internal) {
        //             // found an external IPv4 address, which should be the laptop's IP
        //             laptopIp = iface.address;
        //             break;
        //         }
        //     }
        //     if (laptopIp) break;
        // }
        //
        // console.log('Laptop IP:', laptopIp);
        // const count = await Message.find({ chat: req.params.chatId }).countDocuments();
        // console.log(req.params.chatId);
        let messages = await Message.find({ chat: req.params.chatId })
            // .skip((page - 1) * limit)
            // .limit(15)
            // .sort({ createdAt: 1 })
            .populate("sender", "username email image")
            .populate("chat")
            .then((messages)=>{
                // console.log("ms")
                // console.log("your ip: "+req.ip)
                for (message of messages){
                    message.content = filter.clean(message.content)
                    // console.log(message)
                }
                res.send(messages)
            })

        // res.json({ messages, count });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = router;
