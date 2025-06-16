import React, { useState } from 'react'; 

const LoginForm = () => {
    const [form, setForm] = useState({ username: '', password: '' }); 
    const [message, setMessage] = useState(''); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch("http://localhost:8081/api/v1/auth/login", {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(form)
        });
        const text = await response.text(); 
        setMessage(text);
    };

    return (
        <div>
            <h2 style={{ paddingLeft: '20px' }}>Login</h2>
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
                    name="username" 
                    placeholder="Username" 
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
            {message && <p>{message}</p>}
        </div>
    )
};

export default LoginForm; 