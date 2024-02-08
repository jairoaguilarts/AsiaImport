import React, { useState, useEffect } from "react";

import "./HistorialOrden.css";

const firebaseUID = localStorage.getItem("FireBaseUID");

function HistorialPago() {
    const [ordenes, setOrdenes] = useState([]);
    const [singleOrden, setSingleOrden] = useState(null);
    const [productoDetalle, setProductoDetalle] = useState([]);
    const [popUpVisible, setPopUpVisible] = useState(false);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            try {
                const response = await fetch
                    (`https://importasia-api.onrender.com/ordenesUsuario?firebaseUID=${firebaseUID}`);
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

    const mostrarPopUp = async (orden) => {
        setSingleOrden(orden);
        setPopUpVisible(true);

        const productos = [];
        for (const modelo of orden.carrito) {
            try {
                const response = await fetch
                    (`https://importasia-api.onrender.com/buscarProductoModelo?Modelo=${modelo}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del producto');
                }
                const productoDetalles = await response.json();
                productos.push(productoDetalles);
            } catch (error) {
                console.error("Error al cargar detalles del producto", error);
            }
        }
        setProductoDetalle(productos);
    };

    //Presionas el boton Mostrar Detalles y !PAM!
    const PopUpDetalleOrden = () => {
        if (!popUpVisible) return null;
        return (
            <div className="popup-overlay">
                <div className="popup-detalle">
                    <h3>Detalles de la Orden</h3>
                    <hr></hr>
                    <ul>
                        <li>ID_Orden: {singleOrden._id}</li>
                        <p>{singleOrden.nombre_usuario}</p>
                    </ul>
                    <div>
                        <strong>Articulos en la Orden:</strong>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Artículo</th>
                                <th />
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productoDetalle.map((producto, index) => (
                                <tr key={index}>
                                    <td>{producto.Nombre}</td>
                                    <td><img src={producto.ImagenID}
                                        alt={"Imagen"} />
                                    </td>
                                    <td>{singleOrden.cantidades[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div>
                        <strong>Total de la Orden: L. {singleOrden.total}</strong>
                    </div>
                    <button className="button-detalle3"
                        onClick={() => setPopUpVisible(false)}>
                        Cerrar
                    </button>
                </div>
            </div>
        );
    };

    //Return Original
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
                                <td>L. {orden.total}</td>
                                <td>{orden.Fecha}</td>
                                <td>{orden.estadoPago}</td>
                                <td>
                                    <button className="button-historial ver-mas"
                                        onClick={() => mostrarPopUp(orden)}>
                                        Mostrar Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <PopUpDetalleOrden />
        </div>
    );
};

export default HistorialPago;