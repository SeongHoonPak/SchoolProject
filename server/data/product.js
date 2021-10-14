import { db } from '../db/database.js';
import * as userRepository from './auth.js';


const SELECT_JOIN = 
'SELECT pro.id, pro.name, pro.price, pro.description, pro.producturl, pro.createdAt, us.id as userId, us.username FROM products as pro JOIN users as us ON pro.userId = us.id '
const ORDER_DESC = 'ORDER BY pro.createdAt DESC';
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
  .then(result => result[0]);
  

}

export async function getAllByUsername(username) {
  return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`,[username])
  .then(result => result[0]);
 
}

export async function getById(id) {
  console.log('asd',id);
  return db.execute(`${SELECT_JOIN} WHERE pro.id=?`,[id])
  .then(result => result[0][0]);
 

}

export async function create(name, price,description,producturl,userId) {
  console.log('생성시도',name, price,description,producturl,userId);
  return db.execute('INSERT INTO products (name, createdAt, price,description,producturl,userId) VALUES(?,?,?,?,?,?)',[name, new Date, price,description,producturl,userId])
  .then(result => getById(result[0].insertId))
  
}

export async function update(id, name, price, description, producturl) {
  console.log('czczcz',id, name, price, description, producturl);
  return db.execute('UPDATE products SET name=?, price=?, description=?, producturl=? WHERE id=?',[name,price,description, producturl,id])
 
}

export async function remove(id) {
  console.log('삭제할게요',id);
  return db.execute('DELETE FROM products WHERE id=?',[id])
}
