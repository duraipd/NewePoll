// import React from 'react';
// import Select from 'react-select';

// const Nullable = ({ value, onChange }) => {
//   const options = [
//     { label: 'Yes', value: 'yes' },
//     { label: 'No', value: 'no' },
//   ];

//   const nullOption = { label: 'Select...', value: null };

//   const handleChange = (selectedOption) => {
//     onChange(selectedOption ? selectedOption.value : null);
//   };

//   return (
//     <div style={{ width: '200px', textAlign: 'center' }}>
//       <h2>Nullable</h2>
//       <Select
//         options={[nullOption, ...options]}
//         value={options.find((option) => option.value === value) || nullOption}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default Nullable;




// Nullable.jsx

import React from 'react';
import Select from 'react-select';

const Nullable = ({ value, onChange }) => {
  const options = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const nullOption = { label: 'Select...', value: null };

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      <h2>Nullable</h2>
      <Select
        isDisabled={!onChange}  // Disable the input
        options={[nullOption, ...options]}
        value={options.find((option) => option.value === value) || nullOption}
        onChange={handleChange}
      />
    </div>
  );
};

export default Nullable;

