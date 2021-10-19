import express from 'express';
import { body } from 'express-validator';
import * as chatController from '../controller/chat.js';
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

router.get('/:id', isAuth, chatController.getChat);


router.post('/', isAuth, chatController.createChat)

router.post('/:id', isAuth, chatController.openChat)


export default router;