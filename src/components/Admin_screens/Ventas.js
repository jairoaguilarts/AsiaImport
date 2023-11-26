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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0aaab211</td>
            <td>Cargadores</td>
            <td>Descripción del artículo vendido</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
