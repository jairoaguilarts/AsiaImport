import React, { useState, useEffect } from 'react';
import './Carrito.css';
import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';
import cartIcon2 from '../../assets/add-to-cart.png';
import CustomAlert from "../Informative_screens/CustomAlert.js";
import deleteIcon from '../../assets/delete.png';
import closeIcon from '../../assets/close.png';
import { Link } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

const Carrito = ({ onClose }) => {
    const [productos, setProductos] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [entrega, setEntrega] = useState(0);
    const [totalCarrito, setTotalCarrito] = useState(0);
    const [carritoVisible, setCarritoVisible] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("white");

    const firebaseUID = localStorage.getItem("FireBaseUID");

    const mostrarAlerta = (message, variant) => {
        setAlertVariant(variant);
        setAlertMessage(message);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 24000);
    };

    const handleChange = (id, e) => {
        setProductos(
            productos.map(producto =>
                producto.id === id ? { ...producto, cantidad: parseInt(e.target.value) } : producto
            )
        );
    };

    useEffect(() => {

        const fetchCarrito = async () => {
            
            if (firebaseUID !== null) {
                try {
                    const response = await fetch(`https://importasia-api.onrender.com/obtenerCarrito/${firebaseUID}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                    const cantidadesResponse = await fetch(`https://importasia-api.onrender.com/obtenerCantidadesCarrito/${firebaseUID}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!cantidadesResponse.ok) {
                        const errorData = await cantidadesResponse.json();
                        throw new Error(`Error: ${errorData.message || cantidadesResponse.status}`);
                    }
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error: ${errorData.message || response.status}`);
                    }

                    const cantidades = await cantidadesResponse.json();
                    const data = await response.json();

                    const productosConCantidad = data.map((producto, index) => ({ 
                        ...producto, 
                        cantidad: cantidades[index] || "1"
                    }));
                    setProductos(productosConCantidad);
                } catch (error) {
                    console.log('Error al obtener los productos del carrito: ', error);
                    alert("Error");
                }
            } else {
                mostrarAlerta("No se ha iniciado sesion.", "danger");
            }

        };

        fetchCarrito();
    }, []);

     
    useEffect(() => {
        const nuevoSubtotal = productos.reduce((total, producto) => {
            const cantidad = Number(producto.cantidad) || 0;
            const precio = Number(producto.Precio) || 0;
            return total + cantidad * precio;
        }, 0);
        setSubtotal(nuevoSubtotal);
        setTotalCarrito(nuevoSubtotal + entrega);
    }, [productos, entrega]);

    useEffect(() => {
        actualizarTotalCarrito(totalCarrito);
    }, [totalCarrito]);

    const handleChangeCantidad = (modelo, cambio) => {
        setProductos(prevProductos => {
            return prevProductos.map(producto => {
                if (producto.Modelo === modelo) {
                    let cantEstablecida = parseInt(producto.cantidad) + cambio;
                    if (cantEstablecida > producto.Cantidad) {
                        cantEstablecida = producto.Cantidad;
                        alert("No hay mas productos disponibles");
                    }
                    const nuevaCantidad = Math.max(1, cantEstablecida);
                    actualizarCantidadEnCarrito(modelo, nuevaCantidad.toString());
                    return { ...producto, cantidad: nuevaCantidad };
                }
                return producto;
            });
        });
    };

    const handleEntrega = e => {
        setEntrega(parseInt(e.target.value));
        setTotalCarrito(subtotal + parseInt(e.target.value));
    };
    const handleCloseCarrito = () => {
        onClose();
    };

    const actualizarCantidadEnCarrito = async (modelo, cantidad) => {
        try {
            const response = await fetch(`https://importasia-api.onrender.com/actualizarCantidadCarrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firebaseUID, Modelo: modelo, cantidad }),
            });
            console.log(firebaseUID, " Modelo: " + modelo, cantidad);

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(`Error: ${errorData.message || response.status}`);
            }

        } catch (error) {
            console.log('Error al actualizar la cantidad: ', error);
        }
    };

    const actualizarTotalCarrito = async (nuevoTotal) => {
        try {
            const response = await fetch(`https://importasia-api.onrender.com/actualizarTotalCarrito`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firebaseUID, totalCarrito: nuevoTotal }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.status}`);
            }

        } catch (error) {
            console.log('Error al actualizar el total del carrito: ', error);
        }
    };

    const handleRemoveProducto = async (modelo) => {

        try {
            const response = await fetch(`https://importasia-api.onrender.com/eliminarDelCarrito`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firebaseUID, Modelo: modelo }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || response.status}`);
            }

            const nuevosProductos = productos.filter(producto => producto.Modelo !== modelo);
            setProductos(nuevosProductos);
        } catch (error) {
            console.log('Error al eliminar el producto del carrito: ', error);
            alert("Error al eliminar el producto");
        }
    };

    const handlePagarPedido = () => {
        onClose();
    };

    return (
        <>
            {carritoVisible && (
                <div className="carrito">
                    <button className="close-btn" onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" />
                    </button>
                    <div className="carrito-header">
                        <img src={cartIcon2} className="card-icon" alt="Icono del carrito" />
                        <h2>CARRITO DE COMPRAS</h2>
                    </div>
                    <div className="divisor"></div>
                    {showAlert ? (
                        <CustomAlert
                            className="alerta"
                            message={alertMessage}
                            variant={alertVariant}
                            onClose={() => setShowAlert(false)}
                        />
                    ) : (
                        <>
                            {productos.map(producto => (
                                <div className="producto" key={producto.id}>
                                    <img src={producto.ImagenID} alt={producto.Nombre} className="producto-img" />
                                    <div className="producto-detalle">
                                        <span className="producto-nombre">{producto.Nombre}</span>
                                        <div className="producto-cantidad">
                                            <button onClick={() => handleChangeCantidad(producto.Modelo, -1)}>
                                                <img src={minus} alt="Menos" />
                                            </button>
                                            <input
                                                type="number"
                                                readOnly
                                                value={producto.cantidad}
                                            />
                                            <button onClick={() => handleChangeCantidad(producto.Modelo, 1)}>
                                                <img src={plus} alt="Más" />
                                            </button>
                                        </div>
                                        <div className="producto-precio">L {producto.Precio}</div>
                                        <div className="remover-label" onClick={() => handleRemoveProducto(producto.Modelo)}>
                                            Remover
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="totales">
                                <div className="subtotal">
                                    <span>Subtotal</span>
                                    <span>L{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="divisor"></div>
                                <div className="total">
                                    <span>Total</span>
                                    <span>L{totalCarrito.toFixed(2)}</span>
                                </div>
                            </div>
                            <div >
                                <Link to="/compra">
                                    <button className="pagar-btn" onClick={handlePagarPedido}>
                                        PAGAR PEDIDO
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );

};

export default Carrito;