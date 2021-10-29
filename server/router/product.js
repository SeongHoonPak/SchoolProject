import express from 'express';
import { body } from 'express-validator';
import * as productController from '../controller/product.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();
const validateProduct = [
    body('name')
      .isLength({ min: 3 })
      .withMessage('이름은 3글자 이상으로 작성하세요'),
    validate,
    body('price')
    .trim()
    .isNumeric() // 왜 안될까?
    .withMessage('금액에는 숫자만 입력하세요')
    .isLength({max : 8})
    .withMessage('금액이 너무 높습니다'),
  ];


router.get('/search/:select', productController.getSearch);

router.get('/', productController.getProducts);


router.get('/area/:id', productController.getArea);

router.get('/:id', productController.getProduct);


router.post('/', isAuth, validateProduct, productController.createProduct)


router.put('/:id',  isAuth, validateProduct, productController.updateProduct)


router.delete('/:id', isAuth ,productController.removeProduct)

export default router;