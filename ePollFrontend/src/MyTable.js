import React, { useState, useEffect } from "react";
import "./Css/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faFilter } from "@fortawesome/free-solid-svg-icons";

const MyTable = (props) => {
  const { tableValue, table, resetFormData } = props;
  const [error, setError] = useState(null);
  const [displayStaticTable, setDisplayStaticTable] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);

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
        return !filterValue || String(item[key] || "").toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  };

  const sortedAndFilteredTable = applyFilters(
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
    })
  );

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
                          className={`filter-icon ${activeFilter === "columnName" ? "active" : ""}`}
                        />
                        {activeFilter === "columnName" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["columnName"] || ""}
                            onChange={(e) => handleFilterChange("columnName", e.target.value)}
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
                          className={`filter-icon ${activeFilter === "dataType" ? "active" : ""}`}
                        />
                        {activeFilter === "dataType" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["dataType"] || ""}
                            onChange={(e) => handleFilterChange("dataType", e.target.value)}
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
                          className={`filter-icon ${activeFilter === "nullable" ? "active" : ""}`}
                        />
                        {activeFilter === "nullable" && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters["nullable"] || ""}
                            onChange={(e) => handleFilterChange("nullable", e.target.value)}
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
                          className={`filter-icon ${activeFilter === key ? "active" : ""}`}
                        />
                        {activeFilter === key && (
                          <input
                            type="text"
                            placeholder="Filter"
                            value={filters[key] || ""}
                            onChange={(e) => handleFilterChange(key, e.target.value)}
                          />
                        )}
                      </div>
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
              {sortedAndFilteredTable.map((dynamicItem, index) => (
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








