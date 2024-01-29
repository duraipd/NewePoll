import axios from 'axios';
 
const BASE_URL = 'http://your-java-backend-domain:7777/api';
 
const ApiService = {
  submitData: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/submitData`, data);
      return response.data;
    } catch (error) {
      console.error('Error submitting data:', error);
      throw error;
    }
  },
};
 
export default ApiService;