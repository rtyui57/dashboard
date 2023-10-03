import React, { useState, useEffect } from 'react';

const ErrorNotification = ({ error }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  }, [error]);

  return (
    <div
      className={`error-notification ${isVisible ? 'show' : 'hide'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {error}
    </div>
  );
};

export default ErrorNotification;
