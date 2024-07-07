import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: Array,
    receiver: Object
},
    {
        timestamps: true,
    })

const ChatModel = mongoose.model("Chat", chatSchema)

export default ChatModel;