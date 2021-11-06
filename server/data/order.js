import { db } from '../db/database.js';

const ORDER_DESC = 'ORDER BY pro.createdAt DESC';

export async function getChatProduct(userId) {
  return db.execute('SELECT orders.id, pro.id as productId, pro.name FROM orders JOIN products as pro ON pro.id = orders.productId AND pro.userId = ?  ',[userId]).then(result=> 
    result[0]  
   );
}

export async function getCheckChat(productId, userId) {
  return db.execute('SELECT id FROM orders WHERE orders.productId =? AND orders.userId =?',[productId,userId]).then(result=> 
    result[0][0]  
   );
}

export async function getbuyerChat(id) {
  return db.execute('SELECT id, productId FROM orders WHERE orders.userId =?',[id]).then(result=> 
    result[0]  
   );
}
export async function create(productId, userId) {
    return db.execute('INSERT INTO orders (productId, userId, createdAt) VALUES(?,?,?)',[productId, userId, new Date])
    .then(result => ((result[0].insertId)))
    
  }




  export async function remove(id) {
    console.log('삭제할게요',id);
    return db.execute('DELETE FROM products WHERE id=?',[id])
  }