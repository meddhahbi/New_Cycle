const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
        chatName: {
            type: String,
            // required: true
        },
        sender_city: {
            type: String,
            // required: true
        },
        sender_region: {
            type: String,
            // required: true
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ArticleAssociation",
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
