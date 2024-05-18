import axios from "axios"
import coreService from "../Services/CoreApi.js"

export const search = async (user) => {
    const {data} = await coreService.get('/user', {
        params: {
            search: user
        }
    })

    return data;
}