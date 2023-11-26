import React from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ message, variant}) => {
  return (
    <Alert variant={variant} >
      <p>{message}</p>
    </Alert>
  );
};

export default CustomAlert;
