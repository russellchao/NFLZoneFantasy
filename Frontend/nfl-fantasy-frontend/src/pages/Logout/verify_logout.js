const VerifyLogout = () => {
    return (
        <>
            <div>
                <h2 style={{ paddingLeft: '20px' }}>
                    Are you sure you want to log out?
                </h2>
            </div>

            <button 
                type="submit"
                style={{
                    width: '80px',
                    padding: '10px',
                    marginLeft: '100px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Yes
            </button>

            <button 
                type="submit"
                style={{
                    width: '80px',
                    padding: '10px',
                    marginLeft: '20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                No
            </button>
        </>
    );
};

export default VerifyLogout; 