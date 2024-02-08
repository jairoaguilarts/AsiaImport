import React, { useState, useEffect } from "react";

import "./HistorialOrden.css";

const firebaseUID = localStorage.getItem("FireBaseUID");

function HistorialPago() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/ordenesUsuario?firebaseUID=${firebaseUID}`);
                if (!response.ok) {
                    throw new Error('Error al obtener las Órdenes');
                }
                const data = await response.json();
                setOrdenes(data);
            } catch (error) {
                console.error("Error al cargar ordenes", error);
            }
        }

        obtenerOrdenes();
    }, []);
    return (
        <div>
            {ordenes.length === 0 ? (
                <p className="empty-message">*Cric Cric*</p>
            ) : (
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Tipo de Orden</th>
                            <th>Estado de la Orden</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Estado de Pago</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden, index) => (
                            <tr key={index}>
                                <td>{orden.tipoOrden}</td>
                                <td>{orden.estadoOrden}</td>
                                <td>{orden.total}</td>
                                <td>{orden.Fecha}</td>
                                <td>{orden.estadoPago}</td>
                                <td>
                                    <button className="button-historial ver-mas">
                                        Mostrar Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HistorialPago;