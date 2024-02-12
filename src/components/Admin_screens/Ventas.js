import React, { useState, useEffect } from 'react';
import './Ventas.css';
import Pagination from "../Client_screens/Pagination";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ventasPorPagina] = useState(15);

  // Función para calcular el total de todas las ventas
  const calcularTotalVentas = (ventas) => {
    return ventas.reduce((acc, venta) => acc + Number(venta.total || 0), 0);
  };

  // Función para formatear el total de la venta
  const formatTotal = (total) => {
    const num = Number(total);
    if (!isNaN(num)) {
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
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Calcular las ventas que se mostrarán en la página actual
  const indexOfLastVenta = currentPage * ventasPorPagina;
  const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentVentas.map((venta) => (
            <tr key={venta._id}>
              <td>{venta._id}</td>
              <td>{new Date(venta.detalles?.fecha_ingreso).toLocaleDateString()}</td>
              <td>{venta.nombre_usuario}</td>
              <td>{formatTotal(venta.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        productsPerPage={ventasPorPagina}
        totalProducts={ventas.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className="totales-ventas">
        <p className="resumen-ventas">Número total de ventas: {ventas.length}</p>
        <p className="resumen-ventas">Total acumulado de ventas: {formatTotal(calcularTotalVentas(ventas))}</p>
      </div>
    </div>
  );
};

export default Ventas;
