import React from "react";

const modalStyle = {
    position: "fixed",
    top: "80px",
    right: "40px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    padding: "24px",
    zIndex: 2000,
    minWidth: "260px"
};

const buttonStyle = {
    width: '80px',
    padding: '10px',
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const VerifyLogout = ({ onConfirm, onCancel }) => (
    <div style={modalStyle}>
        <div>
            <h3>Are you sure you want to log out?</h3>
        </div>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
            <button style={buttonStyle} onClick={onConfirm}>Yes</button>
            <button style={buttonStyle} onClick={onCancel}>No</button>
        </div>
    </div>
);

export default VerifyLogout;