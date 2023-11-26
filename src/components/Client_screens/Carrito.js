import React, { useState } from 'react';
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
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Parlante Bluetooth con Luz Led', cantidad: 1, precio: 1500.00 },
        { id: 2, nombre: 'Audifonos Bluetooth', cantidad: 2, precio: 900.00 },
    ]);

    const subtotal = productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
    const [entrega, setEntrega] = useState(0);
    const [totalCarrito, setTotalCarrito] = useState(subtotal + entrega);
    const [carritoVisible, setCarritoVisible] = useState(true);
    const handleChange = (id, e) => {
        setProductos(
            productos.map(producto =>
                producto.id === id ? { ...producto, cantidad: parseInt(e.target.value) } : producto
            )
        );
    };

    const handleChangeCantidad = (id, cambio) => {
        setProductos(
            productos.map(producto =>
                producto.id === id ? { ...producto, cantidad: Math.max(0, producto.cantidad + cambio) } : producto
            )
        );
    };

    const handleEntrega = e => {
        setEntrega(parseInt(e.target.value));
        setTotalCarrito(subtotal + parseInt(e.target.value));
    };

    const handleCloseCarrito = () => {
        onClose(); // Este método se pasa desde el padre (Navibar) para cerrar el carrito
    };
    const handleRemoveProducto = (id) => {
        // Actualizar el estado de productos eliminando el producto con el id dado
        setProductos(productos.filter(producto => producto.id !== id));

        // Si también necesitas actualizar el total del carrito después de eliminar un producto,
        // asegúrate de hacerlo aquí también. Por ejemplo:
        const newSubtotal = productos.reduce((total, producto) => {
            if (producto.id !== id) {
                return total + producto.cantidad * producto.precio;
            }
            return total;
        }, 0);

        setTotalCarrito(newSubtotal + entrega);
    };
    const handlePagarPedido = () => {
        // Cierra el carrito llamando a la función onClose
        onClose();

    };
    return (
        <>
            {carritoVisible && (
                <div className="carrito">
                    <button className="close-btn" onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" /> {/* Reemplaza la X con una imagen */}
                    </button>
                    <div className="carrito-header">
                        <img src={cartIcon2} className="card-icon" alt="Icono del carrito" />
                        <h2>CARRITO</h2>
                    </div>
                    <div className="divisor"></div>
                    {productos.map(producto => (
                        <div className="producto" key={producto.id}>
                            <div className="producto-info">
                                <img src={producto.id === 1 ? imagenParlante : imagenAudifonos} alt={producto.nombre} />
                                <span className="producto-nombre">{producto.nombre}</span>
                            </div>
                            <div className="producto-cantidad">
                                <button onClick={() => handleChangeCantidad(producto.id, -1)}>
                                    <img src={minus} alt="Menos" />
                                </button>
                                <input
                                    type="number"
                                    readOnly // Esto hace que el input sea de solo lectura
                                    value={producto.cantidad}
                                    onChange={(e) => handleChange(producto.id, e)} // Esta línea ya no será necesaria si es de solo lectura
                                />
                                <button onClick={() => handleChangeCantidad(producto.id, 1)}>
                                    <img src={plus} alt="Más" />
                                </button>
                            </div>
                            <div className="producto-precio">L {producto.precio.toFixed(2)}</div>
                            <button onClick={() => handleRemoveProducto(producto.id)}>
                                <img src={deleteIcon} alt="Eliminar" />
                            </button>
                        </div>
                    ))}
                    <div className="totales">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>L {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="divisor"></div>
                        <div className="total">
                            <span>Total</span>
                            <span>L {totalCarrito.toFixed(2)}</span>
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