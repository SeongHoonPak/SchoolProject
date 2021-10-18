import { db } from '../db/database.js';
import * as userRepository from './auth.js';

const select = 'SELECT ch.text, ch.createdAt, us.username'
export async function getByChatId(orderId) {
  
    return db.execute(`SELECT * FROM chats as ch JOIN users as us ON ch.orderId = ? AND us.id = ch.userId`, [orderId]).then(result=> 
     result[0]  
    );
  }
  
export async function getById(id) {
    return db.execute(`${select} FROM chats as ch JOIN users as us ON ch.id=? AND ch.userId = us.id`, [id]).then(result=> 
      result[0][0]  
    );
  }
export async function create(text,productId, orderId,userId) {
    return db.execute('INSERT INTO chats (text, productId, orderId, userId,createdAt) VALUES(?,?,?,?,?)',[text,productId, orderId,userId,new Date])
    .then(result => getById(result[0].insertId))
    
  }



//   import { db } from '../db/database.js';
// import * as userRepository from './auth.js';

// const select = 'SELECT ch.text, ch.createdAt, us.username'
// export async function getByChatId(orderId) {
//   db.execute(`${select} FROM chats as ch JOIN users as us ON ch.orderId = ?`, [orderId]).then(result=> 
//     console.log('ch확인좀zczxc',result[0]))
//     return db.execute(`${select} FROM chats as ch JOIN users as us ON ch.productId=? AND ch.userId=? AND us.id = ch.userId`, [id,userId]).then(result=> 
//      result[0]  
//     );
//   }
  
// export async function getById(id) {
//     return db.execute(`${select} FROM chats as ch JOIN users as us ON ch.id=? AND ch.userId = us.id`, [id]).then(result=> 
//       result[0][0]  
//     );
//   }
// export async function create(text,productId, orderId,userId) {
//     return db.execute('INSERT INTO chats (text, productId, orderId, userId,createdAt) VALUES(?,?,?,?,?)',[text,productId, orderId,userId,new Date])
//     .then(result => getById(result[0].insertId))
    
//   }