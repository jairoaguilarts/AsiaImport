import React, { useState, useEffect } from 'react';
import './Politicas.css';

const Politicas = () => {
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    // Function to fetch policies
    const fetchPoliticas = async () => {
      try {
        const response = await fetch('http://localhost:3000/politicas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPoliticas(data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchPoliticas();
  }, []);

  return (
    <div className="container">
      {politicas.map((politica, index) => (
        <div key={index} className="content">
          <h2>{politica.titulo}</h2>
          <p>{politica.contenido}</p>
        </div>
      ))}
    </div>
  );
};

export default Politicas;
