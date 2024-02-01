import React, { useState, useEffect } from "react";
import "./Css/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyTable = (props) => {
  const { tableValue, table, resetFormData, updateTable } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedExportOption, setSelectedExportOption] = useState("");

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

  const applyStaticFilters = (data) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        const itemValue = String(item[key] || "").toLowerCase();
        return !filterValue || itemValue.includes(filterValue.toLowerCase());
      });
    });
  };

  const applyDynamicFilters = (data) => {
    return data.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        const itemValue = String(item[key] || "").toLowerCase();
        return (
          displayStaticTable ||
          !filterValue ||
          itemValue.includes(filterValue.toLowerCase())
        );
      });
    });
  };

  const applyFilters = (data, isStaticTable) => {
    if (isStaticTable) {
      return applyStaticFilters(data);
    }

    return applyDynamicFilters(data);
  };

  const sortedAndFilteredStaticTable = applyFilters(
    table.slice().sort((a, b) => {
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
    }),
    true
  );

  const sortedAndFilteredDynamicTable = applyFilters(
    tableValue.slice().sort((a, b) => {
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
    }),
    false
  );

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
        head: [
          Object.keys(tableValue[0]).map(
            (key) => key.charAt(0).toUpperCase() + key.slice(1)
          ),
        ],
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
      const csvContent =
        "data:text/csv;charset=utf-8," +
        tableValue.map((row) => Object.values(row).join(",")).join("\n");

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
      case "pdf":
        exportToPDF();
        break;
      case "csv":
        exportToCSV();
        break;
      default:
        setError("Please select an export option");
    }

    // After exporting, call the updateTable function to update the table data
    if (typeof updateTable === "function") {
      updateTable();
    }
  };

  return (
    <div>
      <div>
        <button onClick={switchToStaticTable} className="tabab">
          {" "}
          Table Definition
        </button>
        <button onClick={() => setDisplayStaticTable(false)} className="tabac">
          Table Data
        </button>
      </div>
      <div className="sub-heading2">
        <label htmlFor="dropdown" className="selecttable">
          Format:
        </label>
        <select
          id="exportDropdown loading1"
          value={selectedExportOption}
          onChange={(e) => setSelectedExportOption(e.target.value)}
          className="form-control1"
        >
          <option className="ex" value="">
            Select Export
          </option>
          <option className="ex" value="excel">
            Export to Excel
          </option>
          <option className="ex" value="pdf">
            Export to PDF
          </option>
          <option className="ex" value="csv">
            Export to CSV
          </option>
        </select>
        <button onClick={handleExport} className="exportbutton">
          Export
        </button>
      </div>

      <div className="tabad">
        {error && <p>Error: {error}</p>}
        {table.length > 0 && (
          <table border="1">
            <thead>
              <tr>
                {displayStaticTable && (
                  <>
                    <th>
                      <div className="header-cell">
                        <span onClick={() => handleSort("columnName")}>
                          Column Name
                          {sortColumn === "columnName" &&
                            (sortOrder === "asc" ? (
                              <FontAwesomeIcon icon={faArrowUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowDown} />
                            ))}
                        </span>
                        <FontAwesomeIcon
                          icon={faFilter}
                          onClick={() => toggleFilter("columnName")}
                          className={`filter-icon ${
                            activeFilter === "columnName" ? "active" : ""
                          }`}
                        />
                        {activeFilter === "columnName" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["columnName"] || ""}
                            onChange={(e) =>
                              handleFilterChange("columnName", e.target.value)
                            }
                          />
                        )}
                      </div>
                    </th>
                    <th>
                      <div className="header-cell">
                        <span onClick={() => handleSort("dataType")}>
                          Data Type
                          {sortColumn === "dataType" &&
                            (sortOrder === "asc" ? (
                              <FontAwesomeIcon icon={faArrowUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowDown} />
                            ))}
                        </span>
                        <FontAwesomeIcon
                          icon={faFilter}
                          onClick={() => toggleFilter("dataType")}
                          className={`filter-icon ${
                            activeFilter === "dataType" ? "active" : ""
                          }`}
                        />
                        {activeFilter === "dataType" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["dataType"] || ""}
                            onChange={(e) =>
                              handleFilterChange("dataType", e.target.value)
                            }
                          />
                        )}
                      </div>
                    </th>
                    <th>
                      <div className="header-cell">
                        <span onClick={() => handleSort("nullable")}>
                          Nullable
                          {sortColumn === "nullable" &&
                            (sortOrder === "asc" ? (
                              <FontAwesomeIcon icon={faArrowUp} />
                            ) : (
                              <FontAwesomeIcon icon={faArrowDown} />
                            ))}
                        </span>
                        <FontAwesomeIcon
                          icon={faFilter}
                          onClick={() => toggleFilter("nullable")}
                          className={`filter-icon ${
                            activeFilter === "nullable" ? "active" : ""
                          }`}
                        />
                        {activeFilter === "nullable" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["nullable"] || ""}
                            onChange={(e) =>
                              handleFilterChange("nullable", e.target.value)
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
                          <input
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
                sortedAndFilteredStaticTable.map((staticItem, index) => (
                  <tr key={`row-${index}`}>
                    {Object.keys(staticItem).map((key, colIndex) => (
                      <td key={colIndex}>{staticItem[key]}</td>
                    ))}
                  </tr>
                ))}
              {sortedAndFilteredDynamicTable.map((dynamicItem, index) => (
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
