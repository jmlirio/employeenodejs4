import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import wavesImage from './waves.jpg';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                Email: email,
                Password: password,
            });
            // const token = response.data.token;
            localStorage.setItem('token', JSON.stringify(response));
            navigate('/home');
        } catch (error) {
            // Handle login error
        }
    };

    return (
<div className='login-container'>
    <div className='login-gradient-background'>
        <div className='login-box'>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                placeholder='Email'
            />
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-control'
                placeholder='Password'
            />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input type='checkbox' id='rememberMe' />
                <label htmlFor='rememberMe' style={{ marginLeft: '5px' }}>Remember Me</label>
            </div>
            <button onClick={handleLogin} className='btn1 btn-primary'>
                Login
            </button>
        </div>
    </div>
</div>

    );
};

export default Login;
