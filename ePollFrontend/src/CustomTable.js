import React from 'react';

function CustomTable({ title }) {
  return (
    <div style={{ width: '200px', textAlign: 'center' }}>
      <h2>{"Column Name"}</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          
          <input type="text" name="name" style={{ width: '100%', height: '35px' }} />
        </label>
      </form>
    </div>
  );
}

export default CustomTable;

