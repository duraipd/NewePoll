import React, { useState } from "react";
 
const TextBox = () => {
  const [selectedOption, setSelectedOption] = useState("");
 
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
 
  const handleAddClick = () => {
    console.log(`Adding item with option: ${selectedOption}`);
  };
 
  return (
    <div>
      <label htmlFor="dropdown"></label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="option1">cats_users</option>
        <option value="option2">cats_users1</option>
        <option value="option3">cats_users2</option>
        <option value="option4">cats_users3</option>
        <option value="option5">cats_users</option>
       
      </select>
 
     
    </div>
  );
};
 
export default TextBox;