import React, { useState } from "react";
import './Css/table.css';

const MyTable = (props) => {
  const { tableValue, table } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);

  console.log("table", table);
  console.log("tableValue", tableValue);

  return (
    <div >
      
      <div>
        <button onClick={() => setDisplayStaticTable(true)} className="tabab">
          {" "}
          Table Definition
        </button>
        <button onClick={() => setDisplayStaticTable(false)} className="tabac">
          Table Data
        </button>
      </div>
      <div className="tabad">
      {error && <p>Error: {error}</p>}
      {table.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {displayStaticTable &&
                Object.keys(table[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              {!displayStaticTable &&
                Object.keys(tableValue[0]).map((key, index) => (
                  <th key={index}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {displayStaticTable &&
              table.map((staticItem, index) => (
                <tr key={`row-${index}`}>
                  {Object.keys(staticItem).map((key, colIndex) => (
                    <td key={colIndex}>{staticItem[key]}</td>
                  ))}
                </tr>
              ))}
            {tableValue.map((dynamicItem, index) => (
              <tr key={`dynamic-row-${index}`}>
                {!displayStaticTable &&
                  Object.keys(dynamicItem).map((key, colIndex) => (
                    <td key={colIndex}>{dynamicItem[key]}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
    </div>
  );
};

export default MyTable;
