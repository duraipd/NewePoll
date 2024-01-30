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

 export const fetch = async ()=>{

    try {
      const response = await axios.get(`http://localhost:7777/api/table`);
      return response.data;
    } catch (error) {
      console.error('Error submitting data:', error);
      throw error;
    }

  }

  export const CreateColoumn = async (tableData) =>{

    try{
      const response = await axios.post(`http://localhost:7777/api/dynamic/addColumns` ,tableData);
      console.log(response.data);
    }catch(error){
      console.error('Error submitting data:', error);
      throw error;
    }
  }




export default new UserService();
