import {db} from '../db/database.js'
  export async function findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username=?', [username]).then(result=> 
  
      result[0][0]
    );
  }
  
  export async function findById(id) {
    return db.execute('SELECT * FROM users WHERE id=?', [id]).then(result=> 
      result[0][0]  
    );
  }

  export async function getUsermanner(username) {
    return db.execute('SELECT * FROM manners as ma JOIN users as us ON us.username=?', [username]).then(result=> 
      result[0][0]  
    );
  }

  export async function postUsermanner(username, manner){
    const userId = await findByUsername(username)
    console.log('userId 체크',userId.id)
    return db.execute('UPDATE manners SET manner=manner*? WHERE manners.userId=?', [manners,userId.id]).then(result=> 
      console.log('ch',result)  
    );
  }

  export async function setUsermanner(userId) {
    return db.execute(
     'INSERT INTO manners (userId, manner) VALUES (?,?)', 
     [userId, 36.5]
    )
  //   .then((result) => {
  //    result[0].insertId;
  //  })
  }
  

  export async function createUser(user) {
    console.log('유저체크',user);
    const {username, password, name, email} = user;
   return db.execute(
     'INSERT INTO users (username, password, name, email) VALUES (?,?,?,?)', 
     [username, password, name, email]
    )
    .then((result) => {
   return result[0].insertId;
   })
  }
  