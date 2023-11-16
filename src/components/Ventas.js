import React from 'react';
import './Ventas.css';

const Ventas = () => {
  return (
    <div className="ventas-container">
      <h1>Historial De Ventas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            {/* Agrega más <th> según sea necesario */}
          </tr>
        </thead>
        <tbody>
          {/* Repite la siguiente fila para cada item de ventas */}
          <tr>
            <td>0aaab211</td>
            <td>Cargadores</td>
            <td>Descripción del artículo vendido</td>
            {/* Agrega más <td> según sea necesario */}
          </tr>
          {/* ... más filas ... */}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
