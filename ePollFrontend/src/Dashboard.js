import React, { useEffect, useState } from "react";
import "./Css/Dashboard.css";
import { CreateColoumn } from "./service/Service";
import Sidebar from "./components/Sidebar";
import { fetch, Desctable, tablefields } from "./service/Service";
import MyTable from "./MyTable";
import "./Css/table.css";
import Swal from 'sweetalert2';

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

  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [tableDataErrors, setTableDataErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // New state for remounting MyTable

  // const handleSelectChange = async (e) => {
  //   setSelectedOptionError("");
  //   setSelectedOption(e.target.value);

  //   const res = await tablefields(e.target.value);
  //   setTableResponse1(res);

  //   const response = await Desctable(e.target.value);
  //   setTableResponse(response);
  // };

  const handleSelectChange = async (e) => {
    try {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue === "" ? null : selectedValue);
 
      const res = await tablefields(selectedValue);
      setTableResponse1(res);
 
      const response = await Desctable(selectedValue);
      setTableResponse(response);
    } catch (error) {
      console.error("Axios Error:", error);
     
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch();
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

  const resetFormData = () => {
    setTableData([
      {
        columnName: "",
        nullable: "",
        dataType: "",
        tableName: selectedOption,
      },
    ]);
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await Desctable(selectedOption);
        const createColumnResponse = await CreateColoumn(tableData);

        Swal.fire({
          icon: 'success',
          title: 'Table Altered Successfully',
          timer: 1000, // Auto close after 3 seconds
          showConfirmButton: false,
         
          customClass: {
            popup: 'custom-popup-success', // Add your custom success class
            title: 'custom-title-success', // Add your custom title class
            content: 'custom-content-success',
            icon:'custom-icon-error' // Add your custom content class
          },
        });

        resetFormData();

        setRefreshKey((prevKey) => prevKey + 1);
        fetchData(); // Fetch data after the table is altered
      } catch (error) {
        console.error("Error:", error);
        
        Swal.fire({
          icon: 'error',
          title: 'Field Already exists in the Table',
          timer: 1000,
          showConfirmButton: false,
        
          customClass: {
            popup: 'custom-popup-error', // Add your custom error class
            title: 'custom-title-error', // Add your custom title class
            content: 'custom-content-error', // Add your custom content class
            icon:'custom-icon-error'
          },
        });
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
          <br />

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
                          type="text1"
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
                          <option value="Boolean">Boolean</option>
                          <option value="Character">Char</option>
                          <option value="Date">Date</option>
                          <option value="Integer">Integer</option>
                          <option value="character varying(25)">Varchar(25)</option>
                          <option value="character varying(100)">Varchar(100)</option>
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
                          +
                        </button>
                        {index > 0 && (
                          <>
                            <button
                              className="action-button minus"
                              onClick={() => handleRemoveRow(index)}
                            >
                              -
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
        <br />
        <MyTable
          tableValue={tableResponse}
          table={tableResponse1}
          resetFormData={resetFormData}
          fetchData={fetchData} // Pass fetchData to MyTable
          key={refreshKey}
        />
      </div>
    </div>
  );
}

export default Dashboard;
