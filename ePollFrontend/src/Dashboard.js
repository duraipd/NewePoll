
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Nullable from './Nullable';
import CustomTable from './CustomTable';

import DataType from './Datatype';
import TextBox from './Textbox';
import ApiService from './ApiService';
import './App.css';

function Dashboard() {
  const [inputSets, setInputSets] = useState([{ id: 1 }]);
  const [submitted, setSubmitted] = useState(false);

  const handleColumnChange = (event, setId) => {
    const updatedInputSets = inputSets.map((set) =>
      set.id === setId ? { ...set, selectedColumn: event.target.value } : set
    );
    setInputSets(updatedInputSets);
  };

  const handleNullableChange = (value, setId) => {
    const updatedInputSets = inputSets.map((set) =>
      set.id === setId ? { ...set, selectedNullable: value } : set
    );
    setInputSets(updatedInputSets);
  };

  const handleDataTypeChange = (value, setId) => {
    const updatedInputSets = inputSets.map((set) =>
      set.id === setId ? { ...set, selectedDataType: value } : set
    );
    setInputSets(updatedInputSets);
  };

  const handleAddInputSet = () => {

    const newId = inputSets.length + 1;
    setInputSets([...inputSets, { id: newId }]);


  const handleRemoveInputSet = (setId) => {
    const updatedInputSets = inputSets.filter((set) => set.id !== setId);
    setInputSets(updatedInputSets);
  };


  const handleSubmit = async () => {
    try {
     
      const fixedRow = inputSets.find((set) => set.id === 1);
      if (!fixedRow || !fixedRow.selectedColumn || !fixedRow.selectedNullable || !fixedRow.selectedDataType) {
        alert('Please fill in all fields in the fixed row');
        return;
      }

    
      const updatedInputSets = [fixedRow];
      setInputSets(updatedInputSets);

      await ApiService.submitData(fixedRow);

      // Set submitted to true
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }

  const handleSubmit = () => {
    console.log('Input Sets:', inputSets);

  };

  const columnsData = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'Email', accessor: 'email' },
  ];
  const generateRowData = (count) => {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        id: i,
        name: `durai ${i}`,
        age: Math.floor(Math.random() * 30) + 20,
        email: `durai${i}@bca.com`,
      });
    }
    return rows;
  };

  const numberOfRows = 50;

  const rowData = generateRowData(numberOfRows);

  return (
    <div className={`app-container ${submitted ? 'hide-on-submit' : ''}`}>
      <header>
        <h1>Table Definition</h1>
      </header>

      <main>
        <TextBox />

        {inputSets.map((set) => (
          <div key={set.id} className={`input-set ${set.id === 1 ? 'fixed-set' : ''}`}>
            <CustomTable onChange={(event) => handleColumnChange(event, set.id)} />
            <Nullable value={set.selectedNullable} onChange={(value) => handleNullableChange(value, set.id)} />
            <DataType value={set.selectedDataType} onChange={(value) => handleDataTypeChange(value, set.id)} />
            {set.id !== 1 && (
              <FaMinus onClick={() => handleRemoveInputSet(set.id)} className="remove-icon" />
            )}
          </div>
        ))}

        <div className="add-button-container">
          <FaPlus className="add-icon" onClick={handleAddInputSet} />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </main>

    </div>
  );
}

export default Dashboard;
