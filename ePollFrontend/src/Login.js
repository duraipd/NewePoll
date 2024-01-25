

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Service from './service/Service';


const Login = () => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_Name: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    console.log('Submitting user data:', user.user_Name, user.password);

    Service.getUser(user)
      .then((response) => {

        var d = response;
        console.log(d)

        if (d==="Welcome") {
        
          navigate('/Dashboard');
        } else if(d==="Invaild Creditenial") {
       
          console.log('Login failed. Handle accordingly.');
        }
      })
      .catch((error) => {
        console.error('Error submitting user data:', error);
      });
  };

  useEffect(() => {
   
  }, []);



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="user_Name" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
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







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     user_Name: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const simulateBackendLogin = () => {
   
//     return new Promise((resolve, reject) => {
     
//       if (user.user_Name === 'exampleUser' && user.password === 'examplePassword') {
//         resolve({ success: true, data: { user_Name: 'exampleUser' } });
//       } else {
//         reject({ success: false, message: 'Invalid credentials' });
//       }
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log('Submitting user data:', user.user_Name, user.password);

//     simulateBackendLogin()
//       .then((response) => {
//         console.log('success!');
//         console.log(response);

//         if (response.success) {
         
//           navigate('/Dashboard', { state: { userData: response.data } });
//         } else {
//           console.log('Login failed. Handle accordingly.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error submitting user data:', error);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-4">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Sign In</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="user_Name" className="form-label">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="User Name"
//                     id="user_Name"
//                     name="user_Name"
//                     value={user.user_Name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password"
//                     id="password"
//                     name="password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary">
//                     Sign in
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


