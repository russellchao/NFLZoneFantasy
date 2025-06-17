import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth_context';


const LoginForm = () => {
    const [form, setForm] = useState({ username: '', password: '' }); 
    const [message, setMessage] = useState(''); 
    const { login } = useAuth(); 

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

        // If the login is successful, store the user's credentials
        if (text === "Login successful") {
            // localStorage.setItem("isLoggedIn", true); 
            // localStorage.setItem("username", form.username); 

            login(form.username);
            navigate("/"); // redirect to home page

            console.log(`User ${form.username} logged in successfully`);
        }
    };

    // Redirect the user to the register page if desired
    const navigate = useNavigate(); 
    const handleRegisterInstead = () => {
        navigate(`/register`); 
    };

    return (
        <>
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
                        Login
                    </button>

                </form>
                {message && <p style={{ paddingLeft: '30px' }}>{message}</p>}
            </div>

            <p>&nbsp;</p>

            <div>
                <h3 style={{paddingLeft: '20px'}}>Don't have an account?</h3>
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
                    onClick={handleRegisterInstead}
                >
                    Register Instead
                </button>
            </div>
        </>
    )
};

export default LoginForm; 