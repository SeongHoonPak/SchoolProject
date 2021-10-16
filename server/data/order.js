import { db } from '../db/database.js';


export async function getChatProduct(id) {
  console.log('Order check',id);
  // DISTINCT userId
  return db.execute('SELECT id, productId FROM orders WHERE orders.productId =?',[id]).then(result=> 
    result[0]  
   );
}

export async function create(productId, userId) {
    console.log('오더 생성시도',productId, userId);
    return db.execute('INSERT INTO orders (productId, userId, createdAt) VALUES(?,?,?)',[productId, userId, new Date])
    .then(result => ((result[0].insertId)))
    
  }




  export async function remove(id) {
    console.log('삭제할게요',id);
    return db.execute('DELETE FROM products WHERE id=?',[id])
  }