// import React from 'react';
// import Select from 'react-select';

// const DataType = ({ value, onChange }) => {
//   const dataTypes = [
//     { label: 'Integer', value: 'int' },
//     { label: 'String', value: 'string' },
//     { label: 'Number', value: 'number' },
//     { label: 'Boolean', value: 'boolean' },
//     { label: 'Array', value: 'array' },
   
//   ];

//   const nullOption = { label: 'Select Data Type...', value: null };

//   const handleChange = (selectedOption) => {
//     onChange(selectedOption ? selectedOption.value : null);
//   };

//   return (
//     <div style={{ width: '200px', textAlign: 'center'}}>
//       <h2>Data Type</h2>
//       <Select
//         options={[nullOption, ...dataTypes]}
//         value={dataTypes.find((option) => option.value === value) || nullOption}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default DataType;



// DataType.jsx

import React from 'react';
import Select from 'react-select';

const DataType = ({ value, onChange }) => {
  const dataTypes = [
    { label: 'Integer', value: 'int' },
    { label: 'String', value: 'string' },
    { label: 'Number', value: 'number' },
    { label: 'Boolean', value: 'boolean' },
    { label: 'Array', value: 'array' },
  ];

  const nullOption = { label: 'Select Data Type...', value: null };

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      <h2>Data Type</h2>
      <Select
        isDisabled={!onChange}  // Disable the input
        options={[nullOption, ...dataTypes]}
        value={dataTypes.find((option) => option.value === value) || nullOption}
        onChange={handleChange}
      />
    </div>
  );
};

export default DataType;

