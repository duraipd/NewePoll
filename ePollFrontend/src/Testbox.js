// TextBox.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './TextBox.css'; // Import the CSS file

const TextBox = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7777/api/table');
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddClick = () => {
    console.log(`Adding item with option: ${selectedOption}`);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="custom-dropdown">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default TextBox;
