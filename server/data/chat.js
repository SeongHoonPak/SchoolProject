import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const select = 'SELECT ch.message, ch.createdAt, us.username'
const ORDER_DESC = 'ORDER BY ch.createdAt DESC';

// const inneruser = 'INNER JOIN users as us ON ord.userId=us.id'
// `${select} FROM chats as ch INNER JOIN orders as ord ON ord.id =? ${inneruser}`
export async function getByChatId(orderId) {
  
    return db.execute(`${select} FROM chats as ch JOIN users as us ON ch.orderId = ? AND us.id = ch.userId ${ORDER_DESC}`, [orderId]).then(result=> 
     result[0]  
    );
  }
  
export async function getById(id) {
    
    return db.execute(`${select} FROM chats as ch JOIN users as us  WHERE ch.id=? AND us.id = ch.userId`, [id]).then(result=> 
      result[0][0]  
    );
  }
export async function create(text,userId,orderId) {
  console.log('ch',text,userId,orderId);
    return db.execute('INSERT INTO chats (message, userId, orderId,createdAt) VALUES(?,?,?,?)',[text,userId,orderId,new Date])
    .then(result => getById(result[0].insertId))
    
  }

