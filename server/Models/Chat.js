const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
        chatName: {
            type: String,
            // required: true
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        dealt: {
            type:[Boolean],
            default:[false, false]
        }

    },

    { timestamps: true })
const Chat = mongoose.model("Chat", chatSchema);

module.exports = {Chat};
