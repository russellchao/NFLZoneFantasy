import React, { useState } from 'react';

const RegisterForm = () => {
    const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
    const [message, setMessage] = useState(''); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch("http://localhost:8081/api/v1/auth/register", {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(form)
        }); 
        const text = await response.text(); 
        setMessage(text); 
    }

    return (
        <div>
            <h2 style={{ paddingLeft: '20px' }}>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterForm; 