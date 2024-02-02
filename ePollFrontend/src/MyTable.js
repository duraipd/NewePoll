import React, { useEffect, useState } from "react";
import "./Css/table.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
 
const MyTable = (props) => {
  const { tableValue, table ,updateMyTableData} = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExportOption, setSelectedExportOption] = useState("");
 
  const itemsPerPage = 7;
  const totalStaticPages = Math.ceil(table.length / itemsPerPage);
  const totalDynamicPages = Math.ceil(tableValue.length / itemsPerPage);
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 
  
  const renderTableRows = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
 
    return data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={`row-${index}`}>
        {Object.keys(item).map((key, colIndex) => (
          <td key={colIndex}>{item[key]}</td>
        ))}
      </tr>
    ));
  };
 
  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(tableValue);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "table_data.xlsx");
    } catch (error) {
      setError("Error exporting to Excel");
    }
  };
 
  
 
  const exportToCSV = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," +
        tableValue.map(row => Object.values(row).join(",")).join("\n");
 
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "table_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError("Error exporting to CSV");
    }
  };
 
  const handleExport = () => {
    switch (selectedExportOption) {
      case "excel":
        exportToExcel();
        break;
     
      case "csv":
        exportToCSV();
        break;
      default:
        setError("Please select an export option");
    }
  };
 
  return (
    <div>
      <h2></h2>
      <div>
        <button onClick={() => setDisplayStaticTable(true)} className="tabab">
          Table Definition
        </button>
        <button onClick={() => setDisplayStaticTable(false)} className="tabac">
          Table Data
        </button>
     
        {/* <select onChange={(e) => setSelectedExportOption(e.target.value)} id="tabdrop" >
          <option value="">Select Export</option>
          <option value="excel">Export to Excel</option>
          <option value="pdf">Export to PDF</option>
          <option value="csv">Export to CSV</option>
        </select> */}
 
<div className="table-header">
            <div className="sub-heading2">
              <label htmlFor="dropdown" className="selecttable">
                Format:
              </label>
            </div>
           
 
            <select
              id="exportDropdown loading1"
              value={selectedExportOption}
              onChange={(e) => setSelectedExportOption(e.target.value)}
              className="form-control1"
            >
              <option className="ex" value="">Select Export</option>
              <option className="ex" value="excel">Export to XLSX</option>
              <option className="ex" value="csv">Export to CSV</option>
            </select>
 
 
        <button onClick={handleExport} className="exportbutton">Export</button>
      </div>
</div>
 
 
      <div className="tabad" >
        {error && <p className="errortab">Error: {error}</p>}
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
            <tbody>{displayStaticTable && renderTableRows(table)}</tbody>
            <tbody>{!displayStaticTable && renderTableRows(tableValue)}</tbody>
          </table>
        )}
        <div>
          {displayStaticTable && (
            <Pagination1
              currentPage={currentPage}
              totalPages={totalStaticPages}
              onPageChange={handlePageChange}
            />
          )}
          {!displayStaticTable && (
            <Pagination1
              currentPage={currentPage}
              totalPages={totalDynamicPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
 
const Pagination1 = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
 
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
 
  let visiblePageNumbers = [];
 
  if (totalPages <= 10) {
    visiblePageNumbers = pageNumbers;
  } else {
    if (currentPage <= 3) {
      visiblePageNumbers = pageNumbers.slice(0, 5);
      if (totalPages > 9) {
        visiblePageNumbers.push('...');
      }
      visiblePageNumbers.push(totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePageNumbers = [1, 2, '...'];
      visiblePageNumbers.push(...pageNumbers.slice(totalPages - 5));
    } else {
      visiblePageNumbers = [1, 2, '...'];
      visiblePageNumbers.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages - 1,
        totalPages
      );
    }
  }
 
  return (
    <div>
      <ul className="pagination">
        {visiblePageNumbers.map((number, index) => (
          <li
            key={index}
            className={currentPage === number ? "active" : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default MyTable;