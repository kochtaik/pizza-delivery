import express from 'express'
import { findUser } from "../controllers";

const router = express.Router();

router.get('/findByEmail', findUser);

export default router;

