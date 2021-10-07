import express from 'express';
import * as cartController from '../controller/cart.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();


router.get('/', isAuth, cartController.getCarts);

router.post('/', isAuth,  cartController.createCart)

router.delete('/', isAuth ,cartController.removeCart)


export default router;