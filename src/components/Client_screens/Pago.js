import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Pago.css';


function Pago() {
  const [productos, setProductos] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [propietarioTarjeta, setPropietarioTarjeta] = useState("");
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [mostrarPopup, setMostrarPopup] = useState(false);
const [mostrarPopupGracias, setMostrarPopupGracias] = useState(false); // Para el segundo pop-up de agradecimiento
const navigate = useNavigate();


  const handlePago = async () => {
    if (!validarDatos()) {
      return;
    }
    const response = await fetch(`https://pixel-pay.com/api/v2/transaction/sale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-key": "1234567890",
        "x-auth-hash": "36cdf8271723276cb6f94904f8bde4b6",
        "Accept": "application/json",
      },

    });
  };

  const handlePagoEfectivo = () => {
    setMostrarPopup(true); // Muestra el pop-up
  };
   // Función para manejar la confirmación del pop-up
   const confirmarPagoEfectivo = () => {
    // Lógica para manejar la confirmación del pago en efectivo
    setMostrarPopup(false); // Oculta el primer pop-up
    setMostrarPopupGracias(true); // Muestra el segundo pop-up
  };
  
  const mostrarPopupGraciasComponente = () => (
    mostrarPopupGracias && (
      <div className="popup-gracias">
        <div className="popup-gracias-contenido">
          <h3>Gracias por tu compra</h3>
          <hr />
          <p>Detalles de la orden...</p>
          <button onClick={() => {
            setMostrarPopupGracias(false); // Primero oculta el pop-up
            navigate('/inicio'); // Luego navega a la página de inicio
          }}>Aceptar</button>
        </div>
      </div>
    )
  );
  
  
  // Función para manejar la cancelación del pop-up
  const cancelarPagoEfectivo = () => {
    // Lógica para manejar la cancelación
    setMostrarPopup(false); // Oculta el pop-up
  };
  const PopupPagoEfectivo = () => (
    <div className="popup">
      <div className="popup-inner">
        <h3>Desea pagar en efectivo al momento de recibir o recoger sus productos</h3>
        <hr></hr>
        <button onClick={confirmarPagoEfectivo}>Aceptar</button>
        <button onClick={cancelarPagoEfectivo}>Cancelar</button>
      </div>
    </div>
  );
  const validarDatos = () => {
    const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    const numeroTarjetaRegex = /^\d{13,18}$/;
    const cvvRegex = /^\d{3,4}$/;
    const fechaExpiracionRegex = /^(?:2[4-9]|2[4-9](0[1-9]|1[0-2]))$/;


    if (!regexNombreApellido.test(propietarioTarjeta)) {
      alert('Datos incorrectos en nombre o apellido. Solo se permiten letras.', 'danger');
      return false;
    }
    if(!numeroTarjetaRegex.test(numeroTarjeta)){
      alert("Datos Incorrectos en la tarjeta, el numero debe tener entre 13 y 18 numeros");
      return false;
    }
    if(!cvvRegex.test(cvv)){
      alert("Datos Incorrectos en el cvv, el numero debe tener entre 3 y 4 numeros");
    }
    if(!fechaExpiracionRegex.test(exp)){
      alert("Datos Incorrectos en la fecha de vencimiento, el formato debe ser: Año/Mes");
      return false;
    }
    

    return true;
  };
  const handleFechaExpiracionChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    if (inputValue.length <= 4) {
      setExp(
        inputValue.replace(/(\d{2})(\d{0,2})/, (match, p1, p2) => `${p1}/${p2}`)
      );
      exp.trim().replace("/", "");
    }
  };

  const mostrarFormularioTarjeta = () => (
    <div className="formulario">
      <label>
        Nombre del Propietario de la Tarjeta:
        <input type='text' onChange={(e) => setPropietarioTarjeta(e.target.value)} placeholder='Nombre en la Tarjeta' />
      </label>
      <label>
        Número de Tarjeta:
        <input onChange={(e) => setNumeroTarjeta(e.target.value)} type="text" placeholder="Número de Tarjeta" />
      </label>
      <label>
        Fecha de Expiración:
        <input   onChange={handleFechaExpiracionChange}
          value={exp}type='text' placeholder='AÑO/MES' />
      </label>
      <label>
        CVV:
        <input onChange={(e) => setCVV(e.target.value)} type="text" placeholder="CVV" />
      </label>
      <div className="boton-contenedor">
        <button onClick={handlePago} type="submit" >Pagar</button>
      </div>
    </div>
  );

  const mostrarInformacionTransferencia = () => (
    <div className="formulario">
      <p>Información para transferencia bancaria:</p>
      <p>Número de cuenta: XXXXXX</p>
      <p>Banco: XXXXXX</p>
      <label>
        Subir imagen de la transferencia:
        <input type="file" />
      </label>
      <div className="boton-contenedor">
        <button type="submit">Enviar</button>
      </div>
    </div>
  );

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
        }
      }
    };

    fetchCarrito();
  }, []);

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.cantidad * producto.Precio;
    }, 0);
  };
  return (
    <div className="pago-container">
      <h1>Detalles de la Orden</h1>
      <div>
        {productos.map(producto => (
          <div className="productos-orden" >
            <div className='productos-imagen'>
            <img src={producto.ImagenID} alt={producto.Nombre} />
            </div>
        
            <div className="productos-orden">
              <span className="productos-nombre">{producto.Nombre}</span>
              <div className="productos-cantidad">
                <p>Cantidad: {producto.cantidad} </p>

              </div>
              <div className="productos-precio"> <p>Precio: L {producto.Precio}.00 </p></div>

            </div>
          </div>
        ))}
        <h5>Total de la Orden: L {calcularTotal()}.00</h5>
      </div>
      <div style={{ marginTop: '70px' }} />
      <h2>Pantalla de Pago</h2>
      <div className="botones-container">
        <button onClick={() => setMetodoPago('tarjeta')}>Pagar con Tarjeta</button>
        { /*<button onClick={() => setMetodoPago('transferencia')}>Transferencia Bancaria</button>*/}
        <button onClick={handlePagoEfectivo}>Pagar en Efectivo</button>
        {mostrarPopup && <PopupPagoEfectivo />}
        {mostrarPopupGraciasComponente()}
      </div>

      {metodoPago === 'tarjeta' && mostrarFormularioTarjeta()}
      {metodoPago === 'transferencia' && mostrarInformacionTransferencia()}
    </div>
  );

}

export default Pago;
