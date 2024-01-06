import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="AlertContainer">
      <div style={{ position: 'fixed', top: 0, left: 0, textAlign: 'center', width: '100%', height: '100%', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
          <h1>{message}</h1>
          <button onClick={onClose}>ok</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
