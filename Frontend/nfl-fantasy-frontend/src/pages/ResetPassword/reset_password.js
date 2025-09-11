import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [form, setForm] = useState({ username: '' }); 
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (message !== '') {
            setMessage('');
        }

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/api/v1/auth/confirmPwReset?username=${form.username}`);
        const text = await response.text(); 
        setMessage(text);
    };

    useEffect(() => {
        // If the message changes, and it's not an empty string, only display it for 5 seconds
        if (message && message !== '') {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

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
                {message && <h3 style={{ paddingLeft: '30px', color: 'yellow' }}>{message}</h3>}
            
            </div>
        </>
    )
};

export default ResetPassword; 