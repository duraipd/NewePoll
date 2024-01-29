import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div>
      <div onClick={() => handleOptionClick(selectedOption)}>
        📁 {selectedOption || 'Data Source'}<br></br>
       
      </div>
   
      
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)} style={{ cursor: 'pointer' }}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;