import { Router } from "express";
import { searchUser } from "../Controllers/UserController.js";

const router = new Router();

router.get('/user/:user', searchUser);
router.get('/', (req, res) => {
    return res.send('Hola')
});

export default router;