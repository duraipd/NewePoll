import React, { useState } from "react";
import './Css/Dashboard.css';
import TextBox from "./service/TextBox";
import { CreateColoumn } from "./service/Service";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  const [rowCount, setRowCount] = useState(1);
  const [tableData, setTableData] = useState([{
    columnName: '',
    nullable: '',
    dataType: ''
  }]);

  const handleAddRow = () => {
    setRowCount(rowCount + 1);
    setTableData([...tableData, {
      columnName: '',
      nullable: '',
      dataType: ''
    }]);
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

  const handleSubmit = async () => {
    const hasEmptyRow = tableData.some(data => (
      data.columnName.trim() === '' || 
      data.nullable.trim() === '' || 
      data.dataType.trim() === ''
    ));

    if (hasEmptyRow) {
      alert('Please fill all the fields');
    } else {
      console.log("submit button clicked");
      console.log(tableData);
      const response = await CreateColoumn(tableData);
      console.log(response);
    }
  };

  

  return (  
    <div className="main">
      <Sidebar />
      <div className="container">
        <div className="dashboard-container">
          <header>
            <h1>Table Definition</h1>
          </header>

          <TextBox />

          <main>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Column Name</th>
                    <th>Nullable</th>
                    <th>Data Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type='text'
                          name={`columnName${index}`}
                          value={data.columnName}
                          onChange={(e) => handleChange(e, index, 'columnName')}
                          className="form-control"
                          placeholder="Column Name"
                          required
                        />
                      </td>
                      <td>
                        <select
                          name={`nullable${index}`}
                          value={data.nullable}
                          onChange={(e) => handleChange(e, index, 'nullable')}
                          className="form-control"
                        >
                          <option value="null">Select the Value</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name={`dataType${index}`}
                          value={data.dataType}
                          onChange={(e) => handleChange(e, index, 'dataType')}
                          className="form-control"
                        >
                          <option value="null">Select the value</option>
                          <option value="Integer">Integer</option>
                          <option value="String">String</option>
                          <option value="Number">Number</option>
                          <option value="Boolean">Boolean</option>
                          <option value="Character">CHAR(n)</option>
                          <option value="Character">VARCHAR(n)</option>
                          <option value="Character">TEXT</option>
                          <option value="Date">DATE</option>
                        </select>
                      </td>
                      <td>
                        <button className="action-button plus" onClick={handleAddRow}>
                          &#43;
                        </button>
                        {index > 0 && (
                          <>
                            <button className="action-button minus" onClick={() => handleRemoveRow(index)}>
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

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
