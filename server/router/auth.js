import express from 'express';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('username은 5자 이상으로 해주세요'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('password는 5자 이상으로 해주세요'),
    validate,
  ];
  
  const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    validate,
  ];


router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.post('/update', isAuth,validateSignup, authController.updateUser);

router.post('/logout', authController.logout);

router.post('/', authController.postUsermanner);

router.get('/', authController.getUsermanner);

router.get('/me', isAuth, authController.me);

router.get('/csrf-token', authController.csrfToken);
export default router;