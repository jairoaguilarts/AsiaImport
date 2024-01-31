import React, { useState, useEffect } from "react";
import "./GestionOrdenes.css";

const GestionOrdenes = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [ordenActual, setOrdenActual] = useState(null);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
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
    const mostrarPopup = (orden) => {
        setOrdenActual(orden);
        setIsPopupVisible(true);
    };
    const PopupEstadoOrden = () => {
        return isPopupVisible ? (
            <div className="popup">
                <div className="popup-inner">
                    <h3>Actualizar Estado de la Orden</h3>
                    <hr></hr>
                    <form>
                        <label>
                            <input type="radio" name="estado" value="Ingresada" onChange={(e) => setEstadoSeleccionado(e.target.value)} checked={estadoSeleccionado === 'Ingresada'} /> Ingresada
                        </label>
                        <label>
                            <input type="radio" name="estado" value="En Proceso" onChange={(e) => setEstadoSeleccionado(e.target.value)} checked={estadoSeleccionado === 'En Proceso'} /> En proceso
                        </label>
                        <label>
                            <input type="radio" name="estado" value="Verificada" onChange={(e) => setEstadoSeleccionado(e.target.value)} checked={estadoSeleccionado === 'Verificada'} /> Verificada
                        </label>
                        <label>
                            <input type="radio" name="estado" value="Completada" onChange={(e) => setEstadoSeleccionado(e.target.value)} checked={estadoSeleccionado === 'Completada'} /> Completado
                        </label>
                        <button type="button" onClick={actualizarEstado}>Actualizar Estado</button>
                        <button type="button" onClick={() => setIsPopupVisible(false)}>Cerrar</button>
                    </form>
                </div>
            </div>
        ) : null;
    };
    const actualizarEstado = () => {
        // Asegúrate de obtener el ID correcto de la ordenActual. Asumimos que es order_id.
        const url = `https://importasia-api.onrender.com/actualizarEstado`;
        const data = { 
            estadoNuevo: estadoSeleccionado, // Asegúrate de que el campo coincida con lo que espera el backend.
            _orderId: ordenActual.order_id // Aquí se envía el ID de la orden.
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Estado actualizado:', data);
            alert('Estado actualizado con exito');
            setIsPopupVisible(false);
            // Actualizar la lista de ordenes. Asegúrate de que usas la propiedad correcta para el ID.
            setOrdenes(ordenes.map(orden => orden.order_id === ordenActual.order_id ? { ...orden, estadoOrden: estadoSeleccionado } : orden));
        })
        .catch((error) => {
            console.error('Error al actualizar estado:', error);
        });
    };
    
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
                                <button className="button-gestion mod-estado-orden" onClick={() => mostrarPopup(orden)}>Estado de Orden</button>
                                    <button className="button-gestion mod-ver-mas">Ampliar Orden</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PopupEstadoOrden />
        </div>
    );
};

export default GestionOrdenes;

