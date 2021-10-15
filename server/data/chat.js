import { db } from '../db/database.js';
import * as userRepository from './auth.js';


export async function getByChatId(id) {
    return db.execute('SELECT * FROM chats WHERE orderId=?', [id]).then(result=> 
      result[0][0]  
    );
  }  

export async function getById(id) {
    const chat = await db.execute('SELECT * FROM chats WHERE id=?', [id]).then(result=> 
      result[0][0]  
    );
    const {username} = await userRepository.findById(chat.userId)
    return {chat,username}
    
  }
export async function create(text,productId, orderId,userId) {
    return db.execute('INSERT INTO chats (text, productId, orderId, userId,createdAt) VALUES(?,?,?,?,?)',[text,productId, orderId,userId,new Date])
    .then(result => getById(result[0].insertId))
    
  }