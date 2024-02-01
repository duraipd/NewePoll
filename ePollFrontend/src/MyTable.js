import React, { useState } from "react";
import "./Css/table.css";

const MyTable = (props) => {
  const { tableValue, table } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed

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
        {displayStaticTable
          ? Object.keys(item).map((key, colIndex) => (
              <td key={colIndex}>{item[key]}</td>
            ))
          : Object.keys(item).map((key, colIndex) => (
              <td key={colIndex}>{tableValue[index][key]}</td>
            ))}
      </tr>
    ));
  };

  return (
    <div>
      <h2></h2>
      <div>
        <button
          onClick={() => setDisplayStaticTable(true)}
          className="tabab "
        >
          {" "}
          Table Definition
        </button>
        <button
          onClick={() => setDisplayStaticTable(false)}
          className="tabac"
        >
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
            <tbody>{displayStaticTable && renderTableRows(table)}</tbody>
            <tbody>
              {!displayStaticTable && renderTableRows(tableValue)}
            </tbody>
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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  let visiblePageNumbers = [];

  if (totalPages <= 10) {
    visiblePageNumbers = pageNumbers;
  } else {
    if (currentPage <= 3) {
      visiblePageNumbers = [...pageNumbers.slice(0, 5), '...', totalPages - 1, totalPages];
    } else if (currentPage >= totalPages - 2) {
      visiblePageNumbers = [1, 2, '...', ...pageNumbers.slice(totalPages - 5)];
    } else {
      visiblePageNumbers = [1, 2, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1, totalPages];
    }
  }

  return (
    <div>
      <ul className="pagination">
        {visiblePageNumbers.map((number, index) => (
          <li
            key={index}
            className={currentPage === number ? 'active' : ''}
            onClick={() => (typeof number === 'number' ? onPageChange(number) : null)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTable;
