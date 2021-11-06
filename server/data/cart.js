import * as productRepository from './product.js';
import { db } from '../db/database.js';


  export async function create(userId, productId) {
    return db.execute('INSERT INTO carts (userId, productId) VALUES(?,?)',[userId, productId])
    .then(result =>
      console.log('result',result) 
      )
    }

  
  export async function getAllById(id) {
    return db
    .execute('SELECT * FROM carts JOIN products ON carts.userId=? AND carts.productId = products.id', [id])
    .then(result => result[0])
    
  }
 
  export async function remove(userId, productId) {
    return db.execute('DELETE FROM carts WHERE userId=? AND productId=?',[userId, productId])
  }
  










  


  
