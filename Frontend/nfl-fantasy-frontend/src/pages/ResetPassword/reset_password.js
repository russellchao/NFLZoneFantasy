import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [form, setForm] = useState({ username: '' }); 
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch(`http://localhost:8081/api/v1/auth/confirmPwReset?username=${form.username}`);
        const text = await response.text(); 
        setMessage(text);
    };

    return (
        <> 
            <div>
                <h2 style={{ paddingLeft: '20px' }}>Reset Password</h2>

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
                        Reset
                    </button>
                </form>
                {message && <p style={{ paddingLeft: '30px' }}>{message}</p>}
            
            </div>
        </>
    )
};

export default ResetPassword; 