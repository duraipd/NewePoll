// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Service from './service/Service';


// const Login = () => {
  
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     user_Name: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    

//     console.log('Submitting user data:', user.user_Name, user.password);

//     Service.getUser(user)
//       .then((response) => {

//         var d = response;
//         console.log(d)

//         if (d==="Welcome") {
        
//           navigate('/Dashboard');
//         } else if(d==="Invaild Creditenial") {
       
//           console.log('Login failed. Handle accordingly.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error submitting user data:', error);
//       });
//   };

//   useEffect(() => {
   
//   }, []);



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
//                 <button type="submit" onClick={handleSubmit}  className="btn btn-primary">
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




// Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Service from './service/Service';
import { startTimer, MAX_CONSECUTIVE_FAILURES } from './timer';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_Name: '',
    password: '',
    Latitude: '',
    longitude:'',
    // userLocation : '',
    currentDateTime: '',
  });
  const [errorMessage ,setErrorMessage]=useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(10);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrorMessage(' ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = new Date().toDateString;
    
    console.log(time);
   
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const { latitude, longitude } = position.coords;

          const currentDate = new Date().toLocaleString();

          setUser({

            ...user,

          // userLocation: `Latitude: ${latitude}, Longitude: ${longitude}`,
           Latitude :` ${latitude}`,
           longitude:`${longitude}`,

            currentDateTime: currentDate,

          });

        },

        (error) => {

          console.error('Error getting user location:', error);

        }

      );

    } else {

      console.error('Geolocation is not supported by this browser.');

    }

    console.log('Submitting user data:', user.user_Name, user.password ,user.currentDateTime);
    

    try {
      const response = await Service.getUser(user);
      var d = response;
      console.log(d);

      if (d === 'waittt Creditenial') {
        navigate('/Dashboard');
      } else if (d === 'Invalid Credentials' || d === 'waittt Creditenial') {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);

        if (0 === MAX_CONSECUTIVE_FAILURES) {
          setShowTimer(true);
          startTimer(setShowTimer, setTimerSeconds, setFailedAttempts);
        }
      }
      else{
        setErrorMessage('Invaild Credentials')
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  useEffect(() => {
    return () => {
      setTimerSeconds(10);
    };
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
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={showTimer}>
                    Sign in
                  </button>
                </div>
              </form>
              {showTimer && (
                <p className="text-danger mt-3">
                 You have entered invalid credentials 3 times. Try again in {timerSeconds} seconds.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
