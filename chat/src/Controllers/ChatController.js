import ChatModel from "../Models/ChatModel.js"

export const create = async (req, res) => {
    const { user, professor } = req.body

    try {
        let chat = await ChatModel.findOne({
            members: { $all: [user, professor] }
        })

        if (chat) return res.status(200).json(chat)

        const newChat = new ChatModel({
            members: [user, professor]
        })

        chat = await newChat.save();

        return res.status(200).json({
            'message': 'OK',
            'data': chat
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const findUserChats = async (req, res) => {
    const userId = req.params.user;

    try {
        const chat = await ChatModel.find({
            members: { $in: [userId] }
        })

        return res.status(200).json({
            'message': 'OK',
            'data': chat
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const findChat = async (req, res) => {
    const { user, professor } = req.params

    try {
        const chat = await ChatModel.find({
            members: { $all: [user, professor] }
        })

        return res.status(200).json({
            'message': 'OK',
            'data': chat
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}