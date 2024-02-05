import React, { useState, useEffect } from "react";
import "./Css/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

import "jspdf-autotable";

const MyTable = (props) => {
  const { tableValue, table, resetFormData, updateMyTableData } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExportOption, setSelectedExportOption] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);

  const itemsPerPage = 7;
  const totalStaticPages = Math.ceil(table.length / itemsPerPage);
  const totalDynamicPages = Math.ceil(tableValue.length / itemsPerPage);

  useEffect(() => {
    setDisplayStaticTable(true);
  }, [tableValue]);

  const switchToStaticTable = () => {
    setDisplayStaticTable(true);
    resetFormData();
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
  };

  const toggleFilter = (column) => {
    setActiveFilter(activeFilter === column ? null : column);
  };

  const applyFilters = (data) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        return (
          !filterValue ||
          String(item[key] || "")
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      });
    });
  };

  const sortedAndFilteredTable = (data) =>
    applyFilters(
      data.slice().sort((a, b) => {
        if (sortColumn) {
          const aValue = String(a[sortColumn] || "");
          const bValue = String(b[sortColumn] || "");

          if (sortOrder === "asc") {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }

        return 0;
      })
    );

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

  const exportToCSV = (data, filename) => {
    try {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        Object.keys(data[0]).join(",") +
        "\n" +
        data.map((row) => Object.values(row).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError("Error exporting to CSV");
    }
  };

  const handleExport = () => {
    // Reset error state

    setError(null);

    if (!selectedExportOption) {
      setError("Please select an format option");
      return;
    }

    // if (table.length === 0 && tableValue.length === 0) {
    //   // setError("Table does not contain any data");
    //   return;
    // }

    if (selectedExportOption === "excel") {
      if (displayStaticTable) {
        exportTableDefinitionsToExcel();
      } else {
        exportTableDataToExcel();
      }
    } else if (selectedExportOption === "csv") {
      if (displayStaticTable) {
        exportTableDefinitionsToCSV();
      } else {
        exportToCSV(tableValue, "table_data.csv");
      }
    }
  };

  const exportTableDefinitionsToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "TableDefinitions");
      XLSX.writeFile(wb, "table_definitions.xlsx");
    } catch (error) {
      setError("Error exporting table definitions to Excel");
    }
  };

  const exportTableDefinitionsToCSV = () => {
    try {
      exportToCSV(table, "table_definitions.csv");
    } catch (error) {
      setError("Error exporting table definitions to CSV");
    }
  };

  const exportTableDataToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(tableValue);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "TableData");
      XLSX.writeFile(wb, "table_data.xlsx");
    } catch (error) {
      setError("Error exporting table data to Excel");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2></h2>
      <div>
      <button
          onClick={() => setDisplayStaticTable(true)}
          className="tabab"
          disabled={tableValue.length === 0 && table.length === 0}
        >
          Table Definition
        </button>
        <button
          onClick={() => setDisplayStaticTable(false)}
          className="tabac"
          disabled={tableValue.length === 0 && table.length === 0}
        >
          Table Data
        </button>
      </div>
      <div className="tabad">
        {table.length > 0 && (
          <div>
            <div className="table-header">
              <div className="sub-heading2">
                <label htmlFor="exportDropdown" className="selecttable1">
                  Format:
                </label>
              </div>

              <select
                id="exportDropdown"
                value={selectedExportOption}
                onChange={(e) => {
                  setSelectedExportOption(e.target.value);
                  setError(null); // Reset error when the user selects an export option
                }}
                className="form-control1"
              >
                <option className="ex" value="">
                  Select Export
                </option>
                <option className="ex" value="excel">
                  Export to XLSX
                </option>
                <option className="ex" value="csv">
                  Export to CSV
                </option>
              </select>

              <button onClick={handleExport} className="exportbutton">
                Export
              </button>
              
            </div>
            <br></br>
            <div className="errortab">
            {error && <p> {error}</p>}
            </div>
            

            <table border="1">
              <thead>
                <tr>
                  {displayStaticTable && (
                    <>
                      <th>
                        <div className="header-cell1">
                          <span onClick={() => handleSort("column_name")}>
                            Column Name
                            
                              {sortColumn === "column_name" &&
                                (sortOrder === "asc" ? (
                                  <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                  <FontAwesomeIcon icon={faArrowDown} />
                                ))}
                            
                          </span>

                          <FontAwesomeIcon
                            icon={faFilter}
                            onClick={() => toggleFilter("column_name")}
                            className={`filter-icon ${
                              activeFilter === "column_name" ? "active" : ""
                            }`}
                          />
                          {activeFilter === "column_name" && (
                            <input className="filterinput"
                              type="text"
                              placeholder="Filter"
                              value={filters["column_name"] || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  "column_name",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </div>
                      </th>
                      <th>
                        <div className="header-cell1">
                          
                          <span onClick={() => handleSort("data_type")}>
                            Data Type 
                            {sortColumn === "data_type" &&
                              (sortOrder === "asc" ? (
                                <FontAwesomeIcon icon={faArrowUp} />
                              ) : (
                                <FontAwesomeIcon icon={faArrowDown} />
                              ))}
                          </span>
                          <FontAwesomeIcon
                            icon={faFilter}
                            onClick={() => toggleFilter("data_type")}
                            className={`filter-icon ${activeFilter === "data_type" ? "active" : ""}`}
                          />
                          {activeFilter === "data_type" && (
                            <input className="filterinput"
                              type="text"
                              placeholder="Filter"
                              value={filters["data_type"] || ""}
                              onChange={(e) => handleFilterChange("data_type", e.target.value)}
                            />
                          )}
                        </div>
                      </th>
                      <th>
                        <div className="header-cell1">
                          <span onClick={() => handleSort("is_nullable")}>
                            Nullable
                          
                              {sortColumn === "is_nullable" &&
                                (sortOrder === "asc" ? (
                                  <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                  <FontAwesomeIcon icon={faArrowDown} />
                                ))}
                            
                          </span>
                          <FontAwesomeIcon
                            icon={faFilter}
                            onClick={() => toggleFilter("is_nullable")}
                            className={`filter-icon ${
                              activeFilter === "is_nullable" ? "active" : ""
                            }`}
                          />
                          {activeFilter === "is_nullable" && (
                            <input className="filterinput"
                              type="text"
                              placeholder="Filter"
                              value={filters["is_nullable"] || ""}
                              onChange={(e) =>
                                handleFilterChange(
                                  "is_nullable",
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </div>
                      </th>
                    </>
                  )}
                  {!displayStaticTable &&
                    Object.keys(tableValue[0]).map((key, index) => (
                      <th key={index}>
                        <div className="header-cell">
                          <span onClick={() => handleSort(key)}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                           
                              {sortColumn === key &&
                                (sortOrder === "asc" ? (
                                  <FontAwesomeIcon icon={faArrowUp} />
                                ) : (
                                  <FontAwesomeIcon icon={faArrowDown} />
                                ))}
                           
                          </span>
                          <FontAwesomeIcon
                            icon={faFilter}
                            onClick={() => toggleFilter(key)}
                            className={`filter-icon ${
                              activeFilter === key ? "active" : ""
                            }`}
                          />
                          {activeFilter === key && (
                            <input className="filterinput"
                              type="text"
                              placeholder="Filter"
                              value={filters[key] || ""}
                              onChange={(e) =>
                                handleFilterChange(key, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {displayStaticTable &&
                  renderTableRows(sortedAndFilteredTable(table))}
                {!displayStaticTable &&
                  renderTableRows(sortedAndFilteredTable(tableValue))}
              </tbody>
            </table>
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
        )}
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
        visiblePageNumbers.push("...");
      }
      visiblePageNumbers.push(totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePageNumbers = [1, 2, "..."];
      visiblePageNumbers.push(...pageNumbers.slice(totalPages - 5));
    } else {
      visiblePageNumbers = [1, 2, "..."];
      visiblePageNumbers.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
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
            onClick={() => typeof number === "number" && onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTable;
