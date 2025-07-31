// Import all logo images
const logoImages = require.context('../../logos/NFL Logos', false, /\.(png|jpe?g|svg)$/);

// Create a mapping of team abbreviations to logo paths
const teamLogos = {};
logoImages.keys().forEach(key => {
    // Remove './' from the start and file extension from the end
    const teamAbbr = key.replace(/^\.\//, '').replace(/\.(png|jpe?g|svg)$/, '');
    teamLogos[teamAbbr] = logoImages(key);
});

const logoStyle = {
    width: '250px',
    height: '250px',
    marginRight: '10px',
    verticalAlign: 'middle'
};

const boxStyle = {
    background: '#b3fff0',
    margin: '0%',
    width: '22%',
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0px 0',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
    border: '2px solid black',  
    borderRadius: '12px'
};

const Home = () => {
    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <img 
                    src={teamLogos["NFL"]} 
                    style={logoStyle}
                />
            </div>

            <div style={{ paddingLeft: '40px', marginTop: '40px' }}>
                <div style={boxStyle}>
                    <h1 style={{ paddingLeft: '20px' }}>NFL Zone</h1> 
                    <h3 style={{ paddingLeft: '20px' }}>A hub for American Football enthusiasts!</h3>
                </div>
            </div>
        </>
    );
};

export default Home; 