import axios from 'axios';
 
const API_BASE_URL = 'http://localhost:7777/api';
 
const ApiServices = axios.create({
  baseURL: API_BASE_URL,
});
 
export const fetchDropdownOptions = async () => {
  try {
    const response = await ApiService.get('/table');
    return response.data;
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
    throw error;
  }
};
 
export default ApiServices;