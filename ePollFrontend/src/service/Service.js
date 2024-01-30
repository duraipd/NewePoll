import axios from "axios";

const Apiurl = "http://localhost:7777/api/login";

class UserService {
  async getUser(user) {
    console.log(user);
    try {
      const response = await axios.post(Apiurl, user, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  }
}

export const fetch = async () => {
  try {
    const response = await axios.get(`http://localhost:7777/api/dynamic/table`);
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export const Desctable = async (Desctable1) => {
  try {
    console.log(Desctable1);
    const response = await axios.get(
      `http://localhost:7777/api/dynamic/${Desctable1}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export const CreateColoumn = async (tableData) => {
  try {
    const response = await axios.post(
      `http://localhost:7777/api/dynamic/addColumns`,
      tableData
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export const Tablecol = async () => {
  try {
    const response = await axios.get(
      `http://localhost:7777/api/dynamic/tabledesc`
    );
    console.log(response.data);
    return response.data;
  } catch {}
};

export const tablefields = async (tablefield) => {
  try {
    const response = await axios.get(
      `http://localhost:7777/api/dynamic/table1/${tablefield}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export default new UserService();
