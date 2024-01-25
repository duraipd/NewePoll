// import axios from "axios";
 
// const Apiurl = "http://localhost:7777/api/login";
 
// class UserService {
//   async getUser( user) {
//     try {
//       const response = await axios.get(Apiurl, { params: user });
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.error("Error in getUser:", error);
//       throw error;
//     }
//   }
 
 
// }
 
// export default new UserService();
 




import axios from 'axios';

const Apiurl = "http://localhost:7777/api/login";

class UserService {
  async getUser(user) {
    try {
      const response = await axios.get(Apiurl, { params: user });
      return response.data;
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  }
}

export default new UserService();

