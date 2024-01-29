
import React, { useState } from 'react';
const Location = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          const currentDate = new Date();
          setCurrentDateTime(currentDate.toLocaleString());
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Geolocation</h1>
      <button onClick={getUserLocation}>Get User Location</button>
      {userLocation && (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
      {currentDateTime && (
        <div>
          <p>{currentDateTime}</p>
        </div>
      )}

     
      
    </div>
  );
};

export default Location;
