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
    return db.execute('SELECT * FROM manners as ma JOIN users as us ON ma.userId = us.id AND us.username=?', [username]).then(result=> 
      result[0][0]  
    );
  }

  export async function postUsermanner(username, manner){
    const userId = await findByUsername(username)
    return db.execute('UPDATE manners SET manner=manner+? WHERE manners.userId=?', [manner,userId.id]).then(result=> 
      getUsermanner(username)
    );
  }

  export async function setUsermanner(userId) {
    return db.execute(
     'INSERT INTO manners (userId, manner) VALUES (?,?)', 
     [userId, 36.5]
    )
    .then((result) => {
     console.log('set manner!!',result)
   })
  }
  
  export async function updateUser(user) {
    const {userId,  username, password, name, email, number} = user
    return db.execute('UPDATE users SET username=?, password=?, name=?, email=?, number=? WHERE id=?',[ username, password, name, email, number,userId])
  }
  export async function createUser(user) {
    const {username, password, name, email, number} = user;
   return db.execute(
     'INSERT INTO users (username, password, name, email, number) VALUES (?,?,?,?,?)', 
     [username, password, name, email,number]
    )
    .then((result) => {
   return result[0].insertId;
   })
  }
  