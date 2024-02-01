
// import React, { useEffect, useState } from "react";

// import "./Css/Dashboard.css";

// import { CreateColoumn } from "./service/Service";

// import Sidebar from "./components/Sidebar";

// import { fetch } from "./service/Service";

// import MyTable from "./MyTable";

// import "./Css/table.css";

// import { Desctable, Tablecol, tablefields } from "./service/Service";

// function Dashboard() {
//   const [fetchResponse, setFetchResponse] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [rowCount, setRowCount] = useState(1);

//   const [tableResponse, setTableResponse] = useState([]);

//   const [tableResponse1, setTableResponse1] = useState([]);

//   const [selectedOption, setSelectedOption] = useState("");

//   const [tableData, setTableData] = useState([
//     {
//       columnName: "",

//       nullable: "",

//       dataType: "",

//       tableName: "", // Initialize tableName as an empty string
//     },
//   ]);

//   // Validation state variables

//   const [selectedOptionError, setSelectedOptionError] = useState("");

//   const [tableDataErrors, setTableDataErrors] = useState([]);

//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleSelectChange = async (e) => {
//     setSelectedOptionError(""); // Clear previous errors

//     setSelectedOption(e.target.value);

//     const res = await tablefields(e.target.value);

//     console.log(res);

//     setTableResponse1(res);

//     const response = await Desctable(e.target.value);

//     setTableResponse(response);

//     console.log(response);

//     console.log(`Selected Option: ${e.target.value}`);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch();

//       console.log("Fetched Data:", response);

//       setFetchResponse(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [selectedOption]);

//   useEffect(() => {
//     // Update tableName in tableData when selectedOption changes

//     setTableData((prevData) =>
//       prevData.map((row) => ({ ...row, tableName: selectedOption }))
//     );
//   }, [selectedOption]);

//   const handleAddRow = () => {
//     setRowCount(rowCount + 1);

//     setTableData([
//       ...tableData,

//       {
//         columnName: "",

//         nullable: "",

//         dataType: "",

//         tableName: selectedOption, // Set tableName when adding a new row
//       },
//     ]);
//   };

//   const handleRemoveRow = (index) => {
//     if (rowCount > 1) {
//       setRowCount(rowCount - 1);

//       setTableData((prevData) => prevData.filter((_, i) => i !== index));
//     }
//   };

//   const handleChange = (event, index, field) => {
//     const updatedData = [...tableData];

//     updatedData[index][field] = event.target.value;

//     setTableData(updatedData);
//   };

//   const validateForm = () => {
//     let isValid = true;

//     // Validate selectedOption

//     if (!selectedOption) {
//       setSelectedOptionError("Please select a table");

//       isValid = false;
//     } else {
//       setSelectedOptionError("");
//     }

//     // Validate tableData

//     const errors = tableData.map((data) => ({
//       columnName: data.columnName.trim() === "",

//       nullable: data.nullable.trim() === "",

//       dataType: data.dataType.trim() === "",
//     }));

//     setTableDataErrors(errors);

//     if (errors.some((error) => Object.values(error).some((e) => e))) {
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async () => {
//     setFormSubmitted(true);

//     const isValid = validateForm();

//     if (isValid) {
//       try {
//         const response = await Desctable(selectedOption);

//         console.log(selectedOption);

//         console.log(response);

//         console.log("submit button clicked");

//         console.log(tableData);

//         console.log(selectedOption);

//         const createColumnResponse = await CreateColoumn(tableData);

//         console.log(createColumnResponse);

//         alert("Table Altered Successfully");
//       } catch (error) {
//         console.error("Error:", error);

//         alert("Field Already exists in the Table");
//       }
//     }
//   };

//   return (
//     <div className="main">
//       <Sidebar />

//       <div className="container full">
//         <div className="dashboard-container">
//           <header className="h1table">
//             <h6>Table Definition</h6>
//           </header>

//           <br></br>

//           <div className="droptable">
//             <label htmlFor="dropdown" className="selecttable">
//               Select table:
//             </label>

//             {loading ? (
//               <p>Loading options...</p>
//             ) : (
//               <div>
//                 <select
//                   id="dropdown"
//                   value={selectedOption}
//                   onChange={handleSelectChange}
//                 >
//                   <option value="">Select table</option>

//                   {fetchResponse.map((item, index) => (
//                     <option key={index} value={item.table_name}>
//                       {item.table_name}
//                     </option>
//                   ))}
//                 </select>

//                 {formSubmitted && (
//                   <div className="error-message">{selectedOptionError}</div>
//                 )}
//               </div>
//             )}
//           </div>

//           <main>
//             <div className="table-container columndesign">
//               <table>
//                 <thead>
//                   <tr>
//                     <th className="headerdesign">Column Name</th>

//                     <th className="headerdesign">Data Type</th>

//                     <th className="headerdesign">Nullable</th>

//                     <th className="headerdesign">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {tableData.map((data, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input
//                           type="text"
//                           name={`columnName${index}`}
//                           value={data.columnName}
//                           onChange={(e) => handleChange(e, index, "columnName")}
//                           className="form-control"
//                           placeholder="Column Name"
//                           required
//                         />

//                         {formSubmitted && (
//                           <div className="error-message">
//                             {tableDataErrors[index]?.columnName &&
//                               "Column Name is required"}
//                           </div>
//                         )}
//                       </td>

//                       <td>
//                         <select
//                           name={`dataType${index}`}
//                           value={data.dataType}
//                           onChange={(e) => handleChange(e, index, "dataType")}
//                           className="form-control"
//                         >
//                           <option value="">Select the value</option>

//                           <option value="Integer">Integer</option>

//                           <option value="String">String</option>

//                           <option value="Number">Number</option>

//                           <option value="Boolean">Boolean</option>

//                           <option value="Character">CHAR(n)</option>

//                           <option value="Character">VARCHAR(n)</option>

//                           <option value="Character">TEXT</option>

//                           <option value="Date">DATE</option>
//                         </select>

//                         {formSubmitted && (
//                           <div className="error-message">
//                             {tableDataErrors[index]?.dataType &&
//                               "Data Type is required"}
//                           </div>
//                         )}
//                       </td>

//                       <td>
//                         <select
//                           name={`nullable${index}`}
//                           value={data.nullable}
//                           onChange={(e) => handleChange(e, index, "nullable")}
//                           className="form-control"
//                         >
//                           <option value="">Select the Value</option>

//                           <option value="Yes">Yes</option>

//                           <option value="No">No</option>
//                         </select>

//                         {formSubmitted && (
//                           <div className="error-message ">
//                             {tableDataErrors[index]?.nullable &&
//                               "Nullable is required"}
//                           </div>
//                         )}
//                       </td>

//                       <td>
//                         <button
//                           className="action-button plus"
//                           onClick={handleAddRow}
//                         >
//                           &#43;
//                         </button>

//                         {index > 0 && (
//                           <>
//                             <button
//                               className="action-button minus"
//                               onClick={() => handleRemoveRow(index)}
//                             >
//                               &#8722;
//                             </button>
//                           </>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <button
//               className="submit-button submitdesign"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </main>
//         </div>
//         <br></br>

//         <MyTable tableValue={tableResponse} table={tableResponse1} />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




import React, { useEffect, useState } from "react";
import "./Css/Dashboard.css";
import { CreateColoumn } from "./service/Service";
import Sidebar from "./components/Sidebar";
import { fetch } from "./service/Service";
import MyTable from "./MyTable";
import "./Css/table.css";
import { Desctable, Tablecol, tablefields } from "./service/Service";

function Dashboard() {
  const [fetchResponse, setFetchResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(1);
  const [tableResponse, setTableResponse] = useState([]);
  const [tableResponse1, setTableResponse1] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([
    {
      columnName: "",
      nullable: "",
      dataType: "",
      tableName: "",
    },
  ]);

  // Validation state variables
  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [tableDataErrors, setTableDataErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSelectChange = async (e) => {
    setSelectedOptionError("");
    setSelectedOption(e.target.value);
    const res = await tablefields(e.target.value);
    setTableResponse1(res);
    const response = await Desctable(e.target.value);
    setTableResponse(response);
    console.log(`Selected Option: ${e.target.value}`);
  };

  const fetchData = async () => {
    try {
      const response = await fetch();
      console.log("Fetched Data:", response);
      setFetchResponse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  useEffect(() => {
    setTableData((prevData) =>
      prevData.map((row) => ({ ...row, tableName: selectedOption }))
    );
  }, [selectedOption]);

  const handleAddRow = () => {
    setRowCount(rowCount + 1);
    setTableData([
      ...tableData,
      {
        columnName: "",
        nullable: "",
        dataType: "",
        tableName: selectedOption,
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (rowCount > 1) {
      setRowCount(rowCount - 1);
      setTableData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleChange = (event, index, field) => {
    const updatedData = [...tableData];
    updatedData[index][field] = event.target.value;
    setTableData(updatedData);
  };

  const validateForm = () => {
    let isValid = true;

    if (!selectedOption) {
      setSelectedOptionError("Please select a table");
      isValid = false;
    } else {
      setSelectedOptionError("");
    }

    const errors = tableData.map((data) => ({
      columnName: data.columnName.trim() === "",
      nullable: data.nullable.trim() === "",
      dataType: data.dataType.trim() === "",
    }));

    setTableDataErrors(errors);

    if (errors.some((error) => Object.values(error).some((e) => e))) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await Desctable(selectedOption);
        console.log(selectedOption);
        console.log(response);
        console.log("submit button clicked");
        console.log(tableData);
        console.log(selectedOption);

        const createColumnResponse = await CreateColoumn(tableData);

        console.log(createColumnResponse);

        alert("Table Altered Successfully");
      } catch (error) {
        console.error("Error:", error);
        alert("Field Already exists in the Table");
      }
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="container full">
        <div className="dashboard-container">
          <header className="h1table">
            <h6>Table Definition</h6>
          </header>
          <br></br>
          <div className="table-header">
  <div className="sub-heading1">
    <label htmlFor="dropdown" className="selecttable">
      Table:
    </label>
  </div>
  <div className="dropdown-container loading">
    {loading ? (
      <p>Loading options...</p>
    ) : (
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className="form-control"
      >
        <option value="">Select table</option>
        {fetchResponse.map((item, index) => (
          <option key={index} value={item.table_name}>
            {item.table_name}
          </option>
        ))}
      </select>
    )}
    {formSubmitted && (
      <div className="error-message">{selectedOptionError}</div>
    )}
  </div>
</div>

          <main>
          <div className="table-container columndesign">
              <table>
                <thead>
                  <tr>
                    <th className="headerdesign">Column Name</th>

                    <th className="headerdesign">Data Type</th>

                    <th className="headerdesign">Nullable</th>

                    <th className="headerdesign">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name={`columnName${index}`}
                          value={data.columnName}
                          onChange={(e) => handleChange(e, index, "columnName")}
                          className="form-control"
                          placeholder="Column Name"
                          required
                        />

                        {formSubmitted && (
                          <div className="error-message">
                            {tableDataErrors[index]?.columnName &&
                              "Column Name is required"}
                          </div>
                        )}
                      </td>

                      <td>
                        <select
                          name={`dataType${index}`}
                          value={data.dataType}
                          onChange={(e) => handleChange(e, index, "dataType")}
                          className="form-control"
                        >
                          <option value="">Select the value</option>

                          <option value="Integer">Integer</option>

                          <option value="String">String</option>

                          <option value="Number">Number</option>

                          <option value="Boolean">Boolean</option>

                          <option value="Character">CHAR(n)</option>

                          <option value="Character">VARCHAR(n)</option>

                          <option value="Character">TEXT</option>

                          <option value="Date">DATE</option>
                        </select>

                        {formSubmitted && (
                          <div className="error-message">
                            {tableDataErrors[index]?.dataType &&
                              "Data Type is required"}
                          </div>
                        )}
                      </td>

                      <td>
                        <select
                          name={`nullable${index}`}
                          value={data.nullable}
                          onChange={(e) => handleChange(e, index, "nullable")}
                          className="form-control"
                        >
                          <option value="">Select the Value</option>

                          <option value="Yes">Yes</option>

                          <option value="No">No</option>
                        </select>

                        {formSubmitted && (
                          <div className="error-message ">
                            {tableDataErrors[index]?.nullable &&
                              "Nullable is required"}
                          </div>
                        )}
                      </td>

                      <td>
                        <button
                          className="action-button plus"
                          onClick={handleAddRow}
                        >
                          &#43;
                        </button>

                        {index > 0 && (
                          <>
                            <button
                              className="action-button minus"
                              onClick={() => handleRemoveRow(index)}
                            >
                              &#8722;
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="submit-button submitdesign"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </main>
        </div>
        <MyTable tableValue={tableResponse} table={tableResponse1} />
      </div>
    </div>
  );
}

export default Dashboard;

