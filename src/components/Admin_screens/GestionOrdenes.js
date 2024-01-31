import React, { useState, useEffect } from "react";
import "./GestionOrdenes.css";

const GestionOrdenes = () => {

    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        fetch(`https://importasia-api.onrender.com/ordenes`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                console.log(response);
                throw response;
            })
            .then(data => setOrdenes(data))
            .catch(error => {
                console.error("Error al recuperar las órdenes:", error);
            });
    }, []);

    const obtenerDetalles = (orden) => {
        if (orden.tipoOrden === 'pickup') {
            return (
                <>
                    <div>Nombre: {orden.detalles.nombreUsuario || 'N/A'}</div>
                    <div>Identidad: {orden.detalles.identidadUsuario || 'N/A'}</div>
                    <div>Teléfono: {orden.detalles.numerotelefono || 'N/A'}</div>
                </>
            );
        } else if (orden.tipoOrden === 'delivery') {
            return (
                <>
                    <div>Departamento: {orden.detalles.departamento || 'N/A'}</div>
                    <div>Municipio: {orden.detalles.municipio || 'N/A'}</div>
                    <div>Dirección: {orden.detalles.direccion || 'N/A'}</div>
                </>
            );
        }
        return <div>Detalles no disponibles</div>;
    };

    return (
        <div>
            <h1 className="titulo-ordenes">Órdenes</h1>
            <hr
                style={{
                    borderColor: "#01A6FF",
                    borderWidth: "4px",
                    borderStyle: "solid",
                }}
            />
            <div className="contenedor-ordenes-gestion">
                <table className="tabla-ordenes-gestion">
                    <thead>
                        <tr>
                            <th>ID Orden</th>
                            <th>Tipo Entrega</th>
                            <th>Detalles</th>
                            <th>Estado Orden</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden => (
                            <tr key={orden.order_id}>
                                <td>{orden.order_id}</td>
                                <td>{orden.tipoOrden}</td>
                                <td>{orden.detalles ? obtenerDetalles(orden) : 'N/A'}</td>
                                <td>{orden.estadoOrden}</td>
                                <td>{orden.Fecha}</td>
                                <td>
                                    <button className="button-gestion mod-estado-orden">Estado de Orden</button>
                                    <button className="button-gestion mod-ver-mas">Ampliar Orden</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionOrdenes;

