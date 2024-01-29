import axios from "axios";

const Apiurl = "http://localhost:7777/api/login";

class UserService {
  async getUser(user) {
    console.log(user)
    try {
      const response = await axios.post(Apiurl, user,{ headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  }
}

export default new UserService();
