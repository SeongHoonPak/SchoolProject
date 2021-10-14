import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
    let token;
    
  const authHeader = req.get('Authorization');
  if ((authHeader && authHeader.startsWith('Bearer '))) {
    console.log("헤더 체크")
   token = authHeader.split(' ')[1];
  }
  if(!token){
    console.log("쿠키 체크");
    token = req.cookies['token'];  
  }

  if(!token){
    console.log('다없어')
    return res.status(401).json(AUTH_ERROR);  
  }
  jwt.verify(
    token,
    config.jwt.secretKey,
    console.log('jwt 인증확인'),
    async (error, decoded) => {
      if (error) {
        console.log('에러 확인중',error);
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      console.log('계속 확인중',user);
      req.userId = user.id; //
      req.token = token
      next();
    }
  );
};
