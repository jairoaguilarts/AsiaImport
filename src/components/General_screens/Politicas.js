import React, { useState, useEffect } from 'react';
import './Politicas.css';

const Politicas = () => {
  const [politicas, setPoliticas] = useState([]);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const response = await fetch('https://importasia-api.onrender.com/politicas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para depuración
        setPoliticas(data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchPoliticas();
  }, []);

  return (
    <div className="politicas-container">
      <h1 className="politicas-title">Políticas De Privacidad</h1>
      <div className="politicas-content">
        {politicas.length > 0 ? (
          politicas.map((politica, index) => (
            <div key={index}>
              <p>{politica.contenido}</p>
            </div>
          ))
        ) : (
          <p>Cargando políticas...</p>
        )}
      </div>
    </div>
  );
};

export default Politicas;
