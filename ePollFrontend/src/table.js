
import React, { useState, useEffect } from 'react';
 
const DynamicTable = ({ initialColumns, initialData }) => {
  const [columns, setColumns] = useState(initialColumns || []);
  const [data, setData] = useState(initialData || []);
 
  const handleAddColumn = (columnName) => {
    const newColumn = { header: columnName, accessor: columnName };
    setColumns([...columns, newColumn]);
 
    setData((prevData) =>
      prevData.map((row) => ({ ...row, [columnName]: `value${row.id}` }))
    );
  };
 
  const handleAddRow = () => {
    const newRow = { id: data.length + 1 };
 
    columns.forEach((column) => {
      newRow[column.accessor] = `value${newRow.id}`;
    });
 
    setData([...data, newRow]);
  };
 
  useEffect(() => {
    setColumns(initialColumns || []);
    setData(initialData || []);
  }, [initialColumns, initialData]);
 
  return (
    <div>
      <button onClick={() => handleAddColumn(`Column ${columns.length + 1}`)}>
        Add Column
      </button>
      <button onClick={handleAddRow}>Add Row</button>
 
      <table border="1">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
  );
};
 
 
export default DynamicTable; 