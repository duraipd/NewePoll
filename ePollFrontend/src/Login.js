import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { authenticateUser } from './AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Service from './service/Service';
const Login = () => {
  const [user, setUser] = useState({
    user_Name: '',
    password: '',
  });
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = () => {
    console.log('Submitting user data:', user.user_Name, user.password);
 
    Service.getUser(user)
      .then((response) => {
        console.log(response.data);
        console.log("data" + user.user_Name + user.password);
      })
      .catch((error) => {
        console.error('Error submitting user data:', error);
      });
  };
 
  useEffect(() => {
   
  }, []);
 
  const getUser = () => {
    Service.getUser(user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };
 

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={handleChange}>
                <div className="mb-3">
                  <label htmlFor="user_Name" className="form-label">
                    user_Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="user_Name"
                    id="user_Name"
                    name="user_Name"
                    value={user.user_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" onClick={handleSubmit}  className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
