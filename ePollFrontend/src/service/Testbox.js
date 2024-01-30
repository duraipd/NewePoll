import React, { useState, useEffect } from 'react';
import { fetch } from './Service';

const TextBox = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fetchResponse, setFetchResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(); 
      console.log('Fetched Data:', response);
      setFetchResponse(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);


  return (
    <div>
      <label htmlFor="dropdown">Select a table:</label>
      {loading ? (
        <p>Loading options...</p>
      ) : (
        <div>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select a table</option>
            {fetchResponse.map((item, index) => (
              <option key={index} value={item.table_name}>
                {item.table_name}
              </option>
            ))}
          </select>
         
        </div>
      )}
    </div>
  );
};

export default TextBox;
