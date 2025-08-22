import {useState, useEffect} from 'react';

const Leaderboard = () => {
    useEffect(() => {
        // Scroll to the top of the page when it loads for the first time
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data from API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/v1/auth/leaderboard');
                const result = await response.json();
                console.log(result);

                // Sort the users based on the number of points in decreasing order
                Object.entries(result).sort((a, b) => b[1] - a[1]);

                setData(result);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <br />
            <h1 style={{ textAlign: 'center' }}>Leaderboard</h1>
            <br />
            <table style={{ width: '70%', borderCollapse: 'collapse', background: '#f8f9fa', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', margin: '0 auto' }}>
                <thead>
                    <tr style={{ background: '#314571ff', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Rank</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Username</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([username, points], index) => {
                        const currentUser = localStorage.getItem("username");
                        const isCurrentUser = username === currentUser;
                        return (
                            <tr
                                key={index}
                                style={{
                                    textAlign: 'center',
                                    background: isCurrentUser ? '#55e455ff' : (index % 2 === 0 ? '#e9ecef' : '#fff')
                                }}
                            >
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#122858ff' }}>{index + 1}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#122858ff' }}>{username}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', fontWeight: 'bold', color: '#122858ff' }}>{points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
