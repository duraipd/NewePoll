
import axios from 'axios';

const baseURL= 'http://localhost:7777/api/login';
// const apiUrl = `${baseURL}/login`;

console.log(baseURL);

const users = [
    { id: 1, user_Name: 'user123', password: 'pass123' },
 
  ];
  
 
  export const authenticateUser = async (user_Name, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.user_Name === user_Name && u.password === password);
  
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid user_Name/Password'));
        }
      }, 1000);
    });
  };
  