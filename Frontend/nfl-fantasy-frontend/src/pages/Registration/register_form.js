import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
    const [message, setMessage] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (message !== '') {
            setMessage('');
        }

        console.log(`Password: ${form.password}`);
        console.log(`Confirm password: ${confirmPassword}`); 

        if (form.password !== confirmPassword) {
            setMessage("Passwords do not match"); 
            return; 
        }

        const response = await fetch("${process.env.SPRING_URL}/api/v1/auth/register", {
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
                    
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <input 
                            name="password" 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Password" 
                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleChange} 
                            required 
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                cursor: 'pointer',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                padding: 0
                            }}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                // Eye-slash SVG
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.94 17.94A10.06 10.06 0 0 1 12 19c-5 0-9.27-3.11-10.44-7.44a1.99 1.99 0 0 1 0-1.12A10.06 10.06 0 0 1 6.06 6.06m3.53-1.53A9.97 9.97 0 0 1 12 5c5 0 9.27 3.11 10.44 7.44a1.99 1.99 0 0 1 0 1.12c-.41 1.47-1.18 2.82-2.22 3.94M3 3l18 18" /></svg>
                            ) : (
                                // Eye SVG
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" stroke="gray" strokeWidth="2" /></svg>
                            )}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <input 
                            name="confirmPassword" 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            placeholder="Confirm Password" 
                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={e => setConfirmPassword(e.target.value)} 
                            required 
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                cursor: 'pointer',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                padding: 0
                            }}
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? (
                                // Eye-slash SVG
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.94 17.94A10.06 10.06 0 0 1 12 19c-5 0-9.27-3.11-10.44-7.44a1.99 1.99 0 0 1 0-1.12A10.06 10.06 0 0 1 6.06 6.06m3.53-1.53A9.97 9.97 0 0 1 12 5c5 0 9.27 3.11 10.44 7.44a1.99 1.99 0 0 1 0 1.12c-.41 1.47-1.18 2.82-2.22 3.94M3 3l18 18" /></svg>
                            ) : (
                                // Eye SVG
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="gray"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" stroke="gray" strokeWidth="2" /></svg>
                            )}
                        </span>
                    </div>
                    
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
                {message && <h3 style={{ paddingLeft: '30px', color: 'yellow' }}>{message}</h3>}
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