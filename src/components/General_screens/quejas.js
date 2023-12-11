import React, { useState } from 'react';
import './quejas.css'; // Asegúrate de tener este archivo en el mismo directorio.

function QuejasComponent() {
  const [historia, setHistoria] = useState('');
  const [datosPersonales, setDatosPersonales] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de la información, por ejemplo, a una API.
    console.log('Historia de queja o reclamo:', historia);
    console.log('Datos personales:', datosPersonales);
  };

  return (
    <div className="quejas-reclamos">
      <form onSubmit={handleSubmit}>
        <h2>Sección de quejas y reclamos</h2>
        
        <div>
          <h2>Historia de queja o reclamo</h2>
          <textarea
            className="text-area"
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          />
        </div>
        
        <div>
          <h2>Datos Personales</h2>
          <textarea
            className="text-area"
            value={datosPersonales}
            onChange={(e) => setDatosPersonales(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn-enviar">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default QuejasComponent;
