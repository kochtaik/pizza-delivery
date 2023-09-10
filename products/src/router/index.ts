import express from 'express';
import { getAllProducts } from '../controllers';

const router = express.Router();

router.get('/', getAllProducts);


export default router;