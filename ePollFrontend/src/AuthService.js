
const users = [
    { id: 1, username: 'user123', password: 'pass123' },
 
  ];
  
 
  export const authenticateUser = async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.username === username && u.password === password);
  
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid Username/Password'));
        }
      }, 1000);
    });
  };
  