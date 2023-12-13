import React, { useState, useEffect } from 'react';
import './Carrito.css';
import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';
import cartIcon2 from '../../assets/add-to-cart.png';
import imagenAudifonos from '../../assets/Audifonos UltraSound.png';
import imagenParlante from '../../assets/Parlante Bluetooth.png';
import deleteIcon from '../../assets/delete.png';
import closeIcon from '../../assets/close.png';
import { Link } from 'react-router-dom';

const Carrito = ({ onClose }) => {
    const [productos, setProductos] = useState([]);

    const [subtotal, setSubtotal] = useState(0);
    const [entrega, setEntrega] = useState(0);
    const [totalCarrito, setTotalCarrito] = useState(0);
    const [carritoVisible, setCarritoVisible] = useState(true);

    const handleChange = (id, e) => {
        setProductos(
            productos.map(producto =>
                producto.id === id ? { ...producto, cantidad: parseInt(e.target.value) } : producto
            )
        );
    };

    useEffect(() => {
        const fetchCarrito = async () => {
            const firebaseUID = localStorage.getItem("FireBaseUID");

            try {
                const response = await fetch(`http://localhost:3000/obtenerCarrito/${firebaseUID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error: ${errorData.message || response.status}`);
                }
                const data = await response.json();
                const productosConCantidad = data.map(producto => ({ ...producto, cantidad: 1 }));
                setProductos(productosConCantidad);
            } catch (error) {
                console.log('Error al obtener los productos del carrito: ', error);
                alert("Error");
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

    const handleChangeCantidad = (modelo, cambio) => {
        setProductos(
            productos.map(producto =>
                producto.Modelo === modelo ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) } : producto
            )
        );
    };

    const handleEntrega = e => {
        setEntrega(parseInt(e.target.value));
        setTotalCarrito(subtotal + parseInt(e.target.value));
    };

    const handleCloseCarrito = () => {
        onClose();
    };
    const handleRemoveProducto = (modelo) => {
        const nuevosProductos = productos.filter(producto => producto.Modelo !== modelo);
        setProductos(nuevosProductos);
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
                        <h2>CARRITO</h2>
                    </div>
                    <div className="divisor"></div>
                    {productos.map(producto => (
                        <div className="producto" key={producto.id}>
                            <div className="producto-info">
                                <img src={producto.ImagenID} alt={producto.Nombre} />
                                <span className="producto-nombre">{producto.Nombre}</span>
                            </div>
                            <div className="producto-cantidad">
                                <button onClick={() => handleChangeCantidad(producto.Modelo, -1)}>
                                    <img src={minus} alt="Menos" />
                                </button>
                                <input
                                    type="number"
                                    readOnly
                                    value={producto.cantidad}
                                    onChange={(e) => handleChange(producto.Modelo, e)}
                                />
                                <button onClick={() => handleChangeCantidad(producto.Modelo, 1)}>
                                    <img src={plus} alt="Más" />
                                </button>
                            </div>
                            <div className="producto-precio">L {producto.Precio}</div>
                            <button onClick={() => handleRemoveProducto(producto.Modelo)}>
                                <img src={deleteIcon} alt="Eliminar" />
                            </button>
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
                    <div className="pagar-btn">
                        <Link to="/compra">
                            <button className="pagar-btn" onClick={handlePagarPedido}>
                                PAGAR PEDIDO
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Carrito;