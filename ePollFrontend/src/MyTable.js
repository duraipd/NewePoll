import React, { useState } from "react";
// import { Desctable } from "./service/Service";
import { Desctable } from "./service/Service";
import './Css/table.css'

const MyTable = (props) => {
  const { tableValue, table } = props;
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const handleButtonClick1 = () => {
    console.log("Button 1 clicked");
    // console.log(table);
    setTableData(table);
  };

  const handleButtonClick2 = async () => {
    setTableData(tableValue);

    // try {
    //   const response = await Desctable("placeholder_entity");
    //   setTableData(response);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   setError(error.message);
    // }
    console.log("Button 2 clicked");
  };

  const data = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      mob: 98745636251,
      password: 8585858555,
      product: "mobile",
      price: 85852,
      brand: "apple",
      waranty: "yes",
    },
    { id: 2, name: "Jane Smith", age: 25, mob: 98745636251 },
    { id: 3, name: "Bob Johnson", age: 35 },
    { id: 4, name: "Bob Johnson", age: 35 },
    { id: 5, name: "Bob Johnson", age: 35 },
  ];

  return (
    <div className="taba">
      <h2></h2>
      <div>
        <button onClick={handleButtonClick1} className="tabab">
          {" "}
          Table Definition
        </button>
        <button onClick={handleButtonClick2} className="tabac">
          Table Data
        </button>
      </div>
      {error && <p>Error: {error}</p>}
      {tableData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(tableValue[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(item).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTable;
