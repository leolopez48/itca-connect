import MessageModel from "../Models/MessageModel.js";

export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body

    try {
        const message = new MessageModel({
            chatId, senderId, text
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

    try {
        const messages = await MessageModel.find({
            _id: chatId
        })

        console.log(messages)

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