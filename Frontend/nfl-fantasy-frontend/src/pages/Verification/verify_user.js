import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyUser = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const { token } = useParams();
    const [result, setResult] = useState(''); 

    useEffect(() => {
        // Call the API to verify the user with the token
        const verifyUser = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/auth/verify?token=${token}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('500: Verification failed');
                }

                const result = await response.text(); 
                console.log(result);
                setResult(result);

            } catch (error) {
                console.error(error);
            }
        };
        verifyUser();

    }, [token]);

    return (
        <div>
            <h2 style={{ paddingLeft: '20px' }}>{result}</h2>
        </div>
    );
};

export default VerifyUser; 