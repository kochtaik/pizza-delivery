import express from 'express';
import { loginUser, signupUser } from "../controllers";

const router = express.Router();

router.get('/login', loginUser);
router.post('/signup', signupUser);

export default router;