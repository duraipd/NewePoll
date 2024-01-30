import React, { useState } from 'react';
import File from './File';
import Dropdown from './Dropdown';

const Folder = ({ name, files }) => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleFolder = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleDropdownSelect = (option) => {
    setIsOpen(option === 'Table Definition');
    setIsOpen(option === 'Data Mapping');
  };

  return (
    <div>
      <Dropdown
        options={['Load Data']}
        onSelect={handleDropdownSelect}
      />
      {isOpen && (
        <div>
          {name}
          <ul>
            {files.map((file, index) => (
              <File key={index} name={file} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;

