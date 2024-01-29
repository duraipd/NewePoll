

// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   const location = useLocation();
//   const userData = location.state?.userData;

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Dashboard</h2>
//               {userData ? (
//                 <>
//                   <p>Welcome, {userData.user_Name}!</p>
//                 </>
//               ) : (
//                 <p>Welcome to Dashboard</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Nullable from './Nullable';
import CustomTable from './CustomTable';
import DataType from './DataType';
import DynamicTable from './table';

function Dashboard() {
  const [inputSets, setInputSets] = useState([{ id: 1 }]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedNullable, setSelectedNullable] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState(null);

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
    setInputSets([...inputSets, { id: inputSets.length + 1 }]);
  };

  const handleRemoveInputSet = (setId) => {
    const updatedInputSets = inputSets.filter((set) => set.id !== setId);
    setInputSets(updatedInputSets);
  };

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
    <div>
      {inputSets.map((set) => (
        <div key={set.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <CustomTable onChange={(event) => handleColumnChange(event, set.id)} />
          <Nullable value={set.selectedNullable} onChange={(value) => handleNullableChange(value, set.id)} />
          <DataType value={set.selectedDataType} onChange={(value) => handleDataTypeChange(value, set.id)} />
          <FaMinus
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'red',
              marginLeft: '10px',
            }}
            onClick={() => handleRemoveInputSet(set.id)}
          />
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaPlus
          style={{
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'green',
            marginRight: '10px',
          }}
          onClick={handleAddInputSet}
        />
        <button style={{ fontSize: '16px' }} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div>
        <DynamicTable initialColumns={columnsData} initialData={rowData} />
      </div>
    </div>
  );
}

export default Dashboard;
