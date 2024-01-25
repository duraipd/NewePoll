import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;

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
    </div>
  );
};

export default Dashboard;

