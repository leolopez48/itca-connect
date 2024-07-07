import ChatModel from "../Models/ChatModel.js";
import MessageModel from "../Models/MessageModel.js";

export const createMessage = async (req, res) => {
    let { sender, receiver, text } = req.body

    try {
        const chat = await ChatModel.findOne({
            members: { $all: [sender, receiver] }
        })

        const chatId = chat._id
        // console.log(chatId)

        const message = new MessageModel({
            chatId, senderId: sender, text
        })

        const newMessage = await message.save();

        return res.json({
            message: "Message created successfully",
            data: newMessage
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params

    console.log(chatId)

    try {
        const messages = await MessageModel.find({
            chatId: chatId
        })
            .sort({ 'updatedAt': 1 })
            .limit(200)

        return res.json({
            message: "Message created successfully",
            data: messages
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}