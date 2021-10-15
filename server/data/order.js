import { db } from '../db/database.js';

export async function create(productId, userId) {
    console.log('오더 생성시도',productId, userId);
    return db.execute('INSERT INTO orders (productId, userId, createdAt) VALUES(?,?,?)',[productId, userId, new Date])
    .then(result => ((result[0].insertId)))
    
  }