import React, { useState, useEffect } from 'react';
import './Ventas.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [numeroTotalVentas, setNumeroTotalVentas] = useState(0);

  // Función para calcular el total de todas las ventas
  const calcularTotalVentas = (ventas) => {
    return ventas.reduce((acc, venta) => acc + Number(venta.total || 0), 0);
  };

  // Función para formatear el total de la venta
  const formatTotal = (total) => {
    const num = Number(total);
    // Asegúrate de que el número no sea NaN antes de formatearlo
    if (!isNaN(num)) {
      // Utiliza toLocaleString para formatear el número con comas y dos decimales
      return `L. ${num.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return 'N/A';
    }
  };

  useEffect(() => {
    fetch('https://importasia-api.onrender.com/ordenes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVentas(data);
        // Utilizar la función calcularTotalVentas para obtener el total acumulado de las ventas
        const total = calcularTotalVentas(data);
        setTotalVentas(total);
        // Calcular el número total de ventas
        setNumeroTotalVentas(data.length);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="ventas-container">
      <h1>Historial De Ventas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nombre de Cliente</th>
            <th>Total de la venta</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta._id}>
              <td>{venta._id}</td>
              <td>{new Date(venta.detalles?.fecha_ingreso).toLocaleDateString()}</td>
              <td>{venta.nombre_usuario}</td>
              <td>{formatTotal(venta.total)}</td> {/* Usamos la función formatTotal para asegurarnos de que el total es un número */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totales-ventas">
        <p className="resumen-ventas">Número total de ventas: {numeroTotalVentas}</p>
        <p className="resumen-ventas">Total acumulado de ventas: {formatTotal(totalVentas)}</p>
      </div>

    </div>
  );
};

export default Ventas;
