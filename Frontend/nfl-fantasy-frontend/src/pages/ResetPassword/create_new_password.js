import React, { useState } from 'react'; 
import { useParams } from 'react-router-dom';

const CreateNewPassword = () => {
    const { username } = useParams(); 
    const [form, setForm] = useState({ newPassword: '' }); 
    const [message, setMessage] = useState(''); 
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch(`http://localhost:8081/api/v1/auth/resetPw?username=${username}&newPassword=${form.newPassword}`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(form)
        });
        const text = await response.text(); 
        setMessage(text);
    };

    return (
        <div>
            <h2 style={{ paddingLeft: '20px' }}>
                Creating a new password for: {username}
            </h2>

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
                        name="newPassword" 
                        placeholder="New Password" 
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
                        Submit
                    </button>
                </form>
                {message && <p style={{ paddingLeft: '30px' }}>{message}</p>}
        </div>
    )
}

export default CreateNewPassword; 