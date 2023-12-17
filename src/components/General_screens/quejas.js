import React, { useState, useEffect } from 'react';
import './quejas.css';

function QuejasComponent() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [historia, setHistoria] = useState('');
  const [error, setError] = useState({ message: '', location: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const validateName = (input) => {
    const re = /^[A-Za-z ]*$/;
    return re.test(input);
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    if (validateName(input)) {
      setNombre(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ message: '', location: '' });
    setSuccessMessage('');

    if (!nombre.trim()) {
      setError({ message: 'Por favor, ingresa tu nombre.', location: 'nombre' });
      return;
    }

    if (!edad.trim()) {
      setError({ message: 'Por favor, ingresa tu edad.', location: 'edad' });
      return;
    }

    if (!historia.trim()) {
      setError({ message: 'Por favor, ingresa la historia de tu queja o reclamo.', location: 'historia' });
      return;
    }

    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum <= 0) {
      setError({ message: 'Por favor, ingresa una edad válida.', location: 'edad' });
      return;
    }

    const formData = {
      historia,
      datosPersonales: { nombre, edad: edadNum },
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    fetch('https://importasia-api.onrender.com/send-complaint', requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage('Queja enviada con éxito.');
        setTimeout(() => {
          setNombre('');
          setEdad('');
          setHistoria('');
          setSuccessMessage('');
        }, 2000);
      })
      .catch((error) => {
        setError({ message: 'Error al enviar la queja: ' + error.message, location: 'form' });
      });
  };

  // Limpieza automática del mensaje de error
  useEffect(() => {
    let timer;
    if (error.message && error.location) {
      timer = setTimeout(() => {
        setError({ message: '', location: '' });
      }, 2000);
    }

    // Limpieza al desmontar
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="quejas-reclamos">
      <form onSubmit={handleSubmit} className="form-quejas">
        <h2>Sección de quejas y reclamos</h2>
        
        {error.location === 'form' && <div className="error-message">{error.message}</div>}
        
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNameChange}
          />
          {error.location === 'nombre' && <div className="error-message">{error.message}</div>}
        </div>
        
        <div className="form-field">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
          {error.location === 'edad' && <div className="error-message">{error.message}</div>}
        </div>
        
        <div className="form-field">
          <label htmlFor="historia">Historia de queja o reclamo</label>
          <textarea
            id="historia"
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          />
          {error.location === 'historia' && <div className="error-message">{error.message}</div>}
        </div>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <button type="submit" className="btn-enviar">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default QuejasComponent;
