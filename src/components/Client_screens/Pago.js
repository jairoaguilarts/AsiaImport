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
  const [ordenId, setOrdenId] = useState('');
  const [ordenEnProceso, setOrdenEnProceso] = useState(false);



  const crearOrden = async () => {
    const detalles = localStorage.getItem("entregaID");

    const dataOrden = {
      firebaseUID,
      detalles,
      Fecha: new Date().toISOString(),
    };

    const responseOrden = await fetch('https://importasia-api.onrender.com/crearOrden', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrden),
    });

    if (responseOrden.ok) {
      const responseOrdenData = await responseOrden.json();
      setOrdenId(responseOrdenData._id);
      const userActualizacion = {
        carritoCompras: [],
        cantidadCarrito: [],
        totalCarrito: "0"
      };

      const responseActualizacionUser = await fetch(`https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userActualizacion),
      });

      if (responseActualizacionUser.ok) {
        console.log("Carrito vaciado y total reseteado correctamente");
      } else {
        console.log("Error al actualizar el usuario: ", await responseActualizacionUser.json());
      }
      return responseOrdenData; // Retornamos los datos de la orden para su uso posterior
    } else {
      alert("Error al crear orden");
      throw new Error("Error al crear orden");
    }
  };
  const confirmarPagoEfectivo = async () => {
    if (ordenEnProceso) return; // Evita crear una nueva orden si ya hay una en proceso

    setOrdenEnProceso(true); // Indica que se está iniciando el proceso de creación de la orden
    setMostrarPopup(false);

    try {
      const ordenData = await crearOrden(); // Creamos la orden
      setMostrarPopupGracias(true); // Mostramos el pop-up de agradecimiento
    } catch (error) {
      console.error("Error al crear la orden en pago en efectivo: ", error);
    } finally {
      setOrdenEnProceso(false); // Restablece el estado una vez completado el proceso, exitoso o no
    }
  };
  const handlePagoN = async () => {
    if (!validarDatos()) {
      return;
    }
    const firebaseUID = localStorage.getItem("FireBaseUID");
    if (!firebaseUID) {
      alert("No se encontró el identificador de usuario.");
      return;
    }


    // Obtenemos los detalles de entrega almacenados
    const detallesEntrega = localStorage.getItem("entregaID");


    // Preparamos los datos para la transacción de pago
    const fechaExpTokens = exp.split('/');
    const fechaExp = fechaExpTokens[0] + fechaExpTokens[1];

    // Asumiendo que tienes una forma de obtener estos datos previamente
    try {
      const responseUsuario = await fetch(`http://localhost:3000/obtenerCorreo?firebaseUID=${firebaseUID}`);

      if (!responseUsuario.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      const { nombre, correo } = await responseUsuario.json();

      // Continuar con el proceso de pago usando el nombre y correo obtenidos
      const detallesEntrega = localStorage.getItem("entregaID");
      const fechaExpTokens = exp.split('/');
      const fechaExp = fechaExpTokens[0] + fechaExpTokens[1];

      const dataPago = {
        customer_name: nombre,
        card_number: numeroTarjeta,
        card_holder: propietarioTarjeta,
        card_expire: fechaExp,
        card_cvv: cvv,
        customer_email: correo,
        billing_address: "Dirección de facturación",
        billing_city: "Ciudad de facturación",
        billing_country: "HN",
        billing_state: "HN-FM",
        billing_phone: "Número de teléfono",
        order_currency: "HNL",
        order_amount: "1", // Asegúrate de reemplazar esto con el monto real de la orden
        env: "sandbox",
      };

      const responsePago = await fetch(`https://pixel-pay.com/api/v2/transaction/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-key": "1234567890",
          "x-auth-hash": "36cdf8271723276cb6f94904f8bde4b6",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataPago),
      });

      if (responsePago.ok) {
        // Si el pago es exitoso, procedemos a crear la orden
        const dataOrden = {
          firebaseUID,
          detalles: detallesEntrega,
          Fecha: new Date().toISOString(),
        };

        const responseOrden = await fetch('https://importasia-api.onrender.com/crearOrden', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataOrden),
        });

        if (responseOrden.ok) {
          const responseOrdenData = await responseOrden.json();
          setOrdenId(responseOrdenData._id);
          setMostrarPopupGracias(true); // Mostramos el pop-up de agradecimiento

          // Procedemos a vaciar el carrito de compras y resetear el total
          const userActualizacion = {
            carritoCompras: [],
            cantidadCarrito: [],
            totalCarrito: "0"
          };

          await fetch(`https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userActualizacion),
          });

          alert("Pago procesado y orden creada con éxito");
        } else {
          alert("Error al crear orden");
        }
      } else {
        // Manejo de la respuesta si el pago falla
        const errorResponse = await responsePago.json();
        console.log("Error al pagar: ", errorResponse);
        alert("El pago ha fallado, por favor intente nuevamente");
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      alert("Ocurrió un error al obtener la información del usuario.");
    }
  };


  const handlePago = async () => {
    if (!validarDatos()) {
      return;
    }

    const detalles = localStorage.getItem("entregaID");

    const dataOrden = {
      firebaseUID,
      detalles,
      Fecha: new Date().toISOString(),
    };

    const responseOrden = await fetch('https://importasia-api.onrender.com/crearOrden', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrden),
    });

    if (responseOrden.ok) {

      const responseOrdenData = await responseOrden.json();

      const responseDetalles = await fetch(`https://importasia-api.onrender.com/obtenerEntrega?_id=${responseOrdenData.detalles}`);

      const detalles = await responseDetalles.json();

      const fechaExpTokens = exp.split('/');
      const fechaExp = fechaExpTokens[0] + fechaExpTokens[1];

      const dataPago = {
        customer_name: responseOrdenData.nombre_usuario,
        card_number: numeroTarjeta,
        card_holder: propietarioTarjeta,
        card_expire: fechaExp,
        card_cvv: cvv,
        customer_email: responseOrdenData.correo,
        billing_address: detalles[0].direccion,
        billing_city: detalles[0].municipio,
        billing_country: "HN",
        billing_state: "HN-FM",
        billing_phone: detalles[0].numerotelefono,
        order_id: responseOrdenData._id,
        order_currency: "HNL",
        order_amount: "1",
        env: "sandbox",
      };

      const response = await fetch(`https://pixel-pay.com/api/v2/transaction/sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-key": "1234567890",
          "x-auth-hash": "36cdf8271723276cb6f94904f8bde4b6",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataPago),
      });

      if (response.ok) {
        alert("Pago procesado");
        setOrdenId(responseOrdenData._id);
        setMostrarPopupGracias(true); // Mostramos el pop-up de agradecimiento

        const userActualizacion = {
          carritoCompras: [],
          cantidadCarrito: [],
          totalCarrito: "0"
        };

        const responseActualizacionUser = await fetch(`https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userActualizacion),
        });

        if (responseActualizacionUser.ok) {

          console.log("Carrito vaciado y total reseteado correctamente");
        } else {
          console.log("Error al actualizar el usuario: ", await responseActualizacionUser.json());
        }

      } else {
        alert("Error en el pago(No pudo ser Procesado)")
        console.log("Error al pagar: ", response);
        console.log(responseOrdenData._id)
        // Aquí manejas el caso en que el pago falló, eliminando la orden creada previamente
        if (responseOrdenData._id) {
          fetch(`http://localhost:3000/eliminarOrden?ordenId=${responseOrdenData._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(response => {
              console.log("Código de estado:", response.status); 
              if (response.ok) {
                console.log("Orden eliminada con éxito debido a fallo en el pago");
              } else {
                console.error("Error al intentar eliminar la orden");
              }
            })
            .then(errorResponse => {
              if (errorResponse) {
                console.error("Respuesta de error:", errorResponse); // Agregar esta línea
              }
            })
            .catch(error => {
              console.error("Error al eliminar la orden: ", error);
            });
        }else{
          console.log("Error al eliminar la orden Id: ");
          console.log(responseOrdenData._id)
        }
      }
    } else {
      alert("Error al crear orden");
    }
  };

  const handlePagoEfectivo = () => {
    setMostrarPopup(true);
  };

  const mostrarPopupGraciasComponente = () => (
    mostrarPopupGracias && (
      <div className="popup-gracias">
        <div className="popup-gracias-contenido">
          <h3>Gracias por tu compra</h3>
          <hr />
          <p>ID de la orden: {ordenId}</p>
          <button onClick={() => {
            setMostrarPopupGracias(false);
            navigate('/inicio');
          }}>Aceptar</button>
        </div>
      </div>
    )
  );

  const cancelarPagoEfectivo = () => {
    setMostrarPopup(false);
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
    if (!numeroTarjetaRegex.test(numeroTarjeta)) {
      alert("Datos Incorrectos en la tarjeta, el numero debe tener entre 13 y 18 numeros");
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      alert("Datos Incorrectos en el cvv, el numero debe tener entre 3 y 4 numeros");
    }

    return true;
  };

  const handleFechaExpiracionChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
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
        <input onChange={handleFechaExpiracionChange}
          value={exp} type='text' placeholder='AÑO/MES' />
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
