import React, { useState, useEffect } from "react";
import "./Css/table.css";

const MyTable = (props) => {
  const { tableValue, table, resetFormData, fetchData } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);

  useEffect(() => {
   
    setDisplayStaticTable(true);
  }, [tableValue]);

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Adjust the interval as needed (e.g., every 5 seconds)

    return () => {
      // Cleanup interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [fetchData]);

  const switchToStaticTable = () => {
    resetFormData();
    setDisplayStaticTable(true);
  };

  return (
    <div>
      <h2></h2>
      <div>
        <button onClick={switchToStaticTable} className="tabab">
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
                {displayStaticTable && <th>Column Name</th>}
                {displayStaticTable && <th>Data Type</th>}
                {displayStaticTable && <th>Nullable</th>}
                {!displayStaticTable &&
                  Object.keys(tableValue[0]).map((key, index) => (
                    <th key={index}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
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
