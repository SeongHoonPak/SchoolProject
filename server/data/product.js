import { db } from '../db/database.js';
import * as userRepository from './auth.js';


const SELECT_JOIN = 
'SELECT pro.id, pro.name, pro.price, pro.description, pro.producturl, pro.createdAt, pro.area, us.id as userId, us.username FROM products as pro JOIN users as us ON pro.userId = us.id '
const ORDER_DESC = 'ORDER BY pro.createdAt DESC';
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
  .then(result => result[0]);
}
export async function getSelect(select) {
  console.log('셀렉요청',select);
  return db.execute(`${SELECT_JOIN} WHERE pro.name LIKE ? ${ORDER_DESC}`,[`%${select}%`])
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

export async function create(name, price,description,producturl,userId,area) {
  console.log('생성시도',name, price,description,producturl,userId);
  return db.execute('INSERT INTO products (name, createdAt, price,description,producturl,userId,area) VALUES(?,?,?,?,?,?,?)',[name, new Date, price,description,producturl,userId,area])
  .then(result => getById(result[0].insertId))
  
}

export async function update(id, name, price, description, producturl,area) {
  console.log('czczcz',id, name, price, description, producturl,area);
  return db.execute('UPDATE products SET name=?, price=?, description=?, producturl=?, area=? WHERE id=?',[name,price,description, producturl,area,id])
 
}

export async function remove(id) {
  console.log('삭제할게요',id);
  return db.execute('DELETE FROM products WHERE id=?',[id])
}


