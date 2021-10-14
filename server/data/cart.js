import * as productRepository from './product.js';
import { db } from '../db/database.js';


  export async function create(userId, productId) {
    return db.execute('INSERT INTO carts (userId, productId) VALUES(?,?)',[userId, productId])
    .then(result =>
      console.log('aa',result) 
      )
    }

  
  export async function getAllByUserId(id) {
   const products = await getAllById(id)
   return Promise.all(products.map(async product => {
     const cartproduct = await productRepository.getById(product.productId)
     return {cartproduct}
   }))
   
  }
  
  export async function getAllById(id) {
      console.log('id chdck',id);
    return  db
    .execute('SELECT productId FROM carts WHERE userId=?', [id])
    .then(result => result[0])

  }
  
  export async function remove(userId, productId) {
    console.log('삭제할게요',userId, productId);
    return db.execute('DELETE FROM carts WHERE userId=? AND productId=?',[userId, productId])
  }
  










  


  
