import React from 'react';
import { useLocation } from 'react-router-dom';
import DynamicTable from './table';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const columnsData = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'Email', accessor: 'email' },
  ];
  const generateRowData = (count) => {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        id: i,
        name: `durai ${i}`,
        age: Math.floor(Math.random() * 30) + 20,
        email: `durai${i}@bca.com`,
      });
    }
    return rows;
  };
 
  const numberOfRows = 50;
 
  const rowData = generateRowData(numberOfRows);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Dashboard</h2>
              {userData ? (
                <>
                  <p>Welcome, {userData.user_Name}!</p>
                </>
              ) : (
                <p>Welcome to Dashboard</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <DynamicTable initialColumns={columnsData} initialData={rowData} />
    </div>
  );
};

export default Dashboard;

