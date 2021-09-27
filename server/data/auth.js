let users = [
    {
      id: '1',
      username: 'bob',
      password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
      name: 'Bob',
      email: 'bob@gmail.com',
      url: 'profile'},
      {
        id: '2',
        username: 'seonghoon',
        password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
        name: 'Seonghoon',
        email: 'seong@gmail.com',
        url: 'profile'},
  ];
  
  export async function findByUsername(username) {
    return users.find((user) => user.username === username);
  }
  
  export async function findById(id) {
    return users.find((user) => user.id === id);
  }
  
  export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
  }
  