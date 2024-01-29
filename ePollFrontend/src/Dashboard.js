import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Nullable from './Nullable';
import CustomTable from './CustomTable';
import { DataType } from './service/DataType';
import TextBox from './service/Testbox';
import ApiService from './service/ApiService.JS';
import DynamicTable from './table';
import './App.css';
 
function Dashboard() {
  const [inputSets, setInputSets] = useState([{ id: 1 }]);
  const [submitted, setSubmitted] = useState(false);
  const [columnsData, setColumnsData] = useState([
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'Email', accessor: 'email' },
  ]);
 
  // Example function to generate row data
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
 
  const [rowData, setRowData] = useState(generateRowData(50));
 
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
  };
 
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
 
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
 
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
 
      {/* Include DynamicTable component */}
<DynamicTable initialColumns={columnsData} initialData={rowData} />
</div>
  );
}
 
export default Dashboard;