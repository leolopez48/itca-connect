import { search } from "../Repositories/UserRepository.js";

export const searchUser = async (req, res) => {
    try {
        const user = await search(req.user)

        return res.status(200).json({
            'message': 'User found',
            'data': user
        });
    } catch (error) {
        return res.status(500).json({
            'message': error.response?.data.message ?? error.message,
        });
    }
}