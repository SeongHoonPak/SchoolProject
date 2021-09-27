import express from 'express';
import * as productController from '../controller/product.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();



router.get('/', productController.getProducts);


router.get('/:id', productController.getProduct);


router.post('/', isAuth, productController.createProduct)


router.put('/:id',  isAuth, productController.updateProduct)


router.delete('/:id', isAuth ,productController.removeProduct)

export default router;