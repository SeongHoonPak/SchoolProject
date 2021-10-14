import * as productRepository from './product.js';
import { db } from '../db/database.js';


  export async function create(userId, productId) {
    return db.execute('INSERT INTO carts (userId, productId) VALUES(?,?)',[userId, productId])
    .then(result =>
      console.log('aa',result) 
      // getById(result[0].insertId)
      )
    }

  
  export async function getAllByUserId(id) {
   const products = await getAllById(id)
   return Promise.all(products.map(async product => {
     const cartproduct = await productRepository.getById(product.productId)
     return {cartproduct}
   }))
   
  //  return Promise.all(products.map(async (product) => {
  //   const cartproduct = await productRepository.getById(product.productId)
  //   console.log('카트확인',cartproduct,'확인 끝');
  //       return{cartproduct}
  //  }))
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
  






// // const SELECT_JOIN = 'SELECT pro.id, pro.name, pro.price, pro.description, pro.producturl, pro.createdAt, us.id as userId, us.username FROM products as pro JOIN users as us ON cart.userId = us.id, cart.productId = pro.id '

// // const ORDER_DESC = 'ORDER BY pro.createdAt DESC';
// // export async function getAll() {
// //   return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
// //   .then(result => result[0]);
  
 
// // }

// // export async function getAllByUsername(username) {
// //   return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`,[username])
// //   .then(result => result[0]);
 
// // }






  


  



// export async function getAllByUserId(id) {
//   const products = await getAllById(id)
//   return Promise.all(products.map(async (product) => {
//    const cartproduct = await productRepository.getById(product.productId)
//    console.log('카트확인',cartproduct);
//        return{cartproduct}
//   }))
//  }
 

 
 
//  export async function getById(id) {
//    console.log('asd',id);
//    return db.execute(`${SELECT_JOIN} WHERE pro.id=?`,[id])
//    .then(result => result[0][0]);
  
//  }
 

 