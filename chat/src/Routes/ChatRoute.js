import { Router } from "express";
import { create, findChat, findUserChats } from "../Controllers/ChatController.js";
import { createMessage, getMessages } from "../Controllers/MessageController.js";

const router = new Router();

router.post('/chat/', create);
router.get('/chat/:user', findUserChats);
router.get('/chat/:user/:professor', findChat);
router.get('/message/:chatId', getMessages);
router.post('/message/', createMessage);

export default router;