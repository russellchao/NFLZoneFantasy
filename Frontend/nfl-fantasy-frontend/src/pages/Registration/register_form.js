import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // Redirect the user to the login page if desired
    const navigate = useNavigate(); 
    const handleLoginInstead = () => {
        navigate(`/login`); 
    };

    return (
        <>
            <div>
                <h2 style={{ paddingLeft: '20px' }}>Register</h2>
                <form 
                    style={{ 
                        paddingLeft: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '300px'
                    }}
                    onSubmit={handleSubmit}
                >
                    <input 
                        name="fullName" 
                        placeholder="Full Name" 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        onChange={handleChange} 
                        required 
                    />

                    <input 
                        name="username" 
                        placeholder="Username" 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        onChange={handleChange} 
                        required 
                    />
                    
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        onChange={handleChange} 
                        required 
                    />
                    
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        onChange={handleChange} 
                        required 
                    />
                    
                    <button 
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Register
                    </button>

                </form>
                {message && <p style={{ paddingLeft: '30px' }}>{message}</p>}
            </div>

            <p>&nbsp;</p>

            <div>
                <h3 style={{paddingLeft: '20px'}}>Already have an account?</h3>
                <button 
                    type="submit"
                    style={{
                        padding: '10px',
                        marginLeft: '20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    onClick={handleLoginInstead}
                >
                    Login Instead
                </button>
            </div>
        </>
    );
};

export default RegisterForm; 