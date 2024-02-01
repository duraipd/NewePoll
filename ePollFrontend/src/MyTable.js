import React, { useState } from "react";
import "./Css/table.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyTable = (props) => {
  const { tableValue, table } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      doc.autoTable({
        head: [Object.keys(tableValue[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1))],
        body: tableValue.map((row) => Object.values(row)),
        startY: 20,
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: "linebreak",
        },
      });
      doc.save("table_data.pdf");
    } catch (error) {
      setError("Error exporting to PDF");
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
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToCSV}>Export to CSV</button>
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
