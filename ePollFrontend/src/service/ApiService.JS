import React, { useState } from 'react';
 
const ApiService = () => {
    const [user_Name, setuser_Name] = useState('');
    const [password, setPassword] = useState('');
 
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:7777/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_Name, password }),
            });
 
           
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
 
    return (
        <div>
            <input type="text" placeholder="user_Name" onChange={(e) => setuser_Name(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Sign in</button>
        </div>
    );
};
 
export default ApiService;