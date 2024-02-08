import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./Pago.css";

function Pago() {
  const [productos, setProductos] = useState([]);
  const [metodoPago, setMetodoPago] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [propietarioTarjeta, setPropietarioTarjeta] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCVV] = useState("");
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarPopupGracias, setMostrarPopupGracias] = useState(false);
  const navigate = useNavigate();
  const [ordenId, setOrdenId] = useState("");
  const [ordenEnProceso, setOrdenEnProceso] = useState(false);
  const [correo, setCorreo] = useState("");

  const crearOrden = async () => {
    const detalles = localStorage.getItem("entregaID");
    const fecha = new Date();
    const Fecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    const dataOrden = {
      firebaseUID,
      detalles,
      Fecha,
      estadoPago: "Pagado con Efectivo",
    };
    const responseOrden = await fetch(
      "https://importasia-api.onrender.com/crearOrden",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOrden),
      }
    );

    if (responseOrden.ok) {
      const responseOrdenData = await responseOrden.json();
      setOrdenId(responseOrdenData._id);
      const userActualizacion = {
        carritoCompras: [],
        cantidadCarrito: [],
        totalCarrito: "0",
      };

      const responseActualizacionUser = await fetch(
        `https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userActualizacion),
        }
      );

      if (responseActualizacionUser.ok) {
        console.log("Carrito vaciado y total reseteado correctamente");
      } else {
        console.log(
          "Error al actualizar el usuario: ",
          await responseActualizacionUser.json()
        );
      }

      return responseOrdenData;
    } else {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear orden",
      });

      throw new Error("Error al crear orden");
    }
  };

  const confirmarPagoEfectivo = async () => {
    if (ordenEnProceso) return;

    setOrdenEnProceso(true);
    setMostrarPopup(false);

    try {
      const ordenData = await crearOrden();
      setMostrarPopupGracias(true);
    } catch (error) {
      console.error("Error al crear la orden en pago en efectivo: ", error);
    } finally {
      setOrdenEnProceso(false);
    }
  };
  const handlePagoN = async () => {
    if (!validarDatos()) {
      return;
    }
    const firebaseUID = localStorage.getItem("FireBaseUID");
    if (!firebaseUID) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el identificador de usuario.",
      });

      return;
    }

    const detallesEntrega = localStorage.getItem("entregaID");

    const fechaExpTokens = exp.split("/");
    const fechaExp = fechaExpTokens[0] + fechaExpTokens[1];

    try {
      const responseUsuario = await fetch(
        `http://localhost:3000/obtenerCorreo?firebaseUID=${firebaseUID}`
      );

      if (!responseUsuario.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }
      const { nombre, correo } = await responseUsuario.json();

      const detallesEntrega = localStorage.getItem("entregaID");
      const fechaExpTokens = exp.split("/");
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

      const responsePago = await fetch(
        `https://pixel-pay.com/api/v2/transaction/sale`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-key": "1234567890",
            "x-auth-hash": "36cdf8271723276cb6f94904f8bde4b6",
            Accept: "application/json",
          },
          body: JSON.stringify(dataPago),
        }
      );

      if (responsePago.ok) {
        const fecha = new Date();
        const Fecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        const dataOrden = {
          firebaseUID,
          detalles: detallesEntrega,
          Fecha,
        };

        const responseOrden = await fetch(
          "https://importasia-api.onrender.com/crearOrden",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataOrden),
          }
        );

        if (responseOrden.ok) {
          const responseOrdenData = await responseOrden.json();
          setOrdenId(responseOrdenData._id);
          setMostrarPopupGracias(true);

          const userActualizacion = {
            carritoCompras: [],
            cantidadCarrito: [],
            totalCarrito: "0",
          };

          await fetch(
            `https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userActualizacion),
            }
          );

          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Pago procesado y orden creada con éxito",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al crear orden",
          });
        }
      } else {

        const errorResponse = await responsePago.json();
        console.log("Error al pagar: ", errorResponse);
        Swal.fire({
          icon: "error",
          title: "Error en el Pago",
          text: "El pago ha fallado, por favor intente nuevamente",
        });

      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al obtener la información del usuario.",
      });
    }
  };

  const handlePago = async () => {
    if (!validarDatos()) {
      return;
    }

    const detalles = localStorage.getItem("entregaID");
    const fecha = new Date();
    const Fecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    const dataOrden = {
      firebaseUID,
      detalles,
      Fecha,
      estadoPago: "Pagado con Tarjeta",
    };

    const responseOrden = await fetch(
      "https://importasia-api.onrender.com/crearOrden",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOrden),
      }
    );

    if (responseOrden.ok) {
      const responseOrdenData = await responseOrden.json();

      const responseDetalles = await fetch(
        `https://importasia-api.onrender.com/obtenerEntrega?_id=${responseOrdenData.detalles}`
      );

      const detalles = await responseDetalles.json();

      const fechaExpTokens = exp.split("/");
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

      const response = await fetch(
        `https://pixel-pay.com/api/v2/transaction/sale`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-key": "1234567890",
            "x-auth-hash": "36cdf8271723276cb6f94904f8bde4b6",
            Accept: "application/json",
          },
          body: JSON.stringify(dataPago),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Pago procesado",
        });
        setOrdenId(responseOrdenData._id);
        setMostrarPopupGracias(true);

        const userActualizacion = {
          carritoCompras: [],
          cantidadCarrito: [],
          totalCarrito: "0",
        };

        const responseActualizacionUser = await fetch(
          `https://importasia-api.onrender.com/usuarioAfterPago/${firebaseUID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userActualizacion),
          }
        );


        const formData = {
          _orderId: responseOrdenData._id,
          tipoOrden: "Delivery",
          Fecha: new Date().toISOString(),
          carrito: responseOrdenData.carrito,
          cantidades: responseOrdenData.cantidades,
          total: responseOrdenData.total,
          correo: responseOrdenData.correo,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        };

        try {
          const mandarOrden = await fetch("http://localhost:3000/send-orderDetails", requestOptions);

          if (!mandarOrden.ok) {
            const errorMessage = await mandarOrden.text();
            throw new Error(errorMessage);
          }

          console.log("Orden enviada al correo con éxito.");

        } catch (error) {
          console.error("Error al enviar la orden:", error);
        }



        if (responseActualizacionUser.ok) {
          console.log("Carrito vaciado y total reseteado correctamente");
        } else {
          console.log(
            "Error al actualizar el usuario: ",
            await responseActualizacionUser.json()
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el Pago",
          text: "El pago no pudo ser procesado",
        });
        console.log("Error al pagar: ", response);
        console.log(responseOrdenData._id);
        if (responseOrdenData._id) {
          fetch(
            `https://importasia-api.onrender.com/eliminarOrden?ordenId=${responseOrdenData._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => {
              console.log("Código de estado:", response.status);
              if (response.ok) {
                console.log(
                  "Orden eliminada con éxito debido a fallo en el pago"
                );
              } else {
                console.error("Error al intentar eliminar la orden");
              }
            })
            .then((errorResponse) => {
              if (errorResponse) {
                console.error("Respuesta de error:", errorResponse);
              }
            })
            .catch((error) => {
              console.error("Error al eliminar la orden: ", error);
            });
        } else {
          console.log("Error al eliminar la orden Id: ");
          console.log(responseOrdenData._id);
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear orden",
      });
    }
  };

  const handlePagoEfectivo = () => {
    setMostrarPopup(true);
  };

  const mostrarPopupGraciasComponente = () =>
    mostrarPopupGracias && (
      <div className="popup-gracias">
        <div className="popup-gracias-contenido">
          <h3>Gracias por tu compra</h3>
          <hr />
          <p>ID de la orden: {ordenId}</p>
          <button
            onClick={() => {
              setMostrarPopupGracias(false);
              navigate("/inicio");
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    );

  const cancelarPagoEfectivo = () => {
    setMostrarPopup(false);
  };

  const PopupPagoEfectivo = () => (
    <div className="popup">
      <div className="popup-inner">
        <h3>
          Desea pagar en efectivo al momento de recibir o recoger sus productos
        </h3>
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
      Swal.fire({
        icon: "error",
        title: "Datos Incorrectos",
        text: "Nombre o apellido incorrecto. Solo se permiten letras.",
      });
      return false;
    }
    if (!numeroTarjetaRegex.test(numeroTarjeta)) {
      Swal.fire({
        icon: "error",
        title: "Número de Tarjeta Inválido",
        text: "El número de tarjeta debe tener entre 13 y 18 dígitos.",
      });
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      Swal.fire({
        icon: "error",
        title: "CVV Inválido",
        text: "El CVV debe tener entre 3 y 4 dígitos.",
      });
      return false;
    }

    return true;
  };

  const handleFechaExpiracionChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
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
        <input
          type="text"
          onChange={(e) => setPropietarioTarjeta(e.target.value)}
          placeholder="Nombre en la Tarjeta"
        />
      </label>
      <label>
        Número de Tarjeta:
        <input
          onChange={(e) => setNumeroTarjeta(e.target.value)}
          type="text"
          placeholder="Número de Tarjeta"
        />
      </label>
      <label>
        Fecha de Expiración:
        <input
          onChange={handleFechaExpiracionChange}
          value={exp}
          type="text"
          placeholder="AÑO/MES"
        />
      </label>
      <label>
        CVV:
        <input
          onChange={(e) => setCVV(e.target.value)}
          type="text"
          placeholder="CVV"
        />
      </label>
      <div className="boton-contenedor">
        <button onClick={handlePago} type="submit">
          Pagar
        </button>
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
          const response = await fetch(
            `https://importasia-api.onrender.com/obtenerCarrito/${firebaseUID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const cantidadesResponse = await fetch(
            `https://importasia-api.onrender.com/obtenerCantidadesCarrito/${firebaseUID}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!cantidadesResponse.ok) {
            const errorData = await cantidadesResponse.json();
            throw new Error(
              `Error: ${errorData.message || cantidadesResponse.status}`
            );
          }
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || response.status}`);
          }

          const cantidades = await cantidadesResponse.json();
          const data = await response.json();

          const productosConCantidad = data.map((producto, index) => ({
            ...producto,
            cantidad: cantidades[index] || "1",
          }));
          setProductos(productosConCantidad);
        } catch (error) {
          console.log("Error al obtener los productos del carrito: ", error);
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
        {productos.map((producto) => (
          <div className="productos-orden">
            <div className="productos-imagen">
              <img src={producto.ImagenID} alt={producto.Nombre} />
            </div>

            <div className="productos-orden">
              <span className="productos-nombre">{producto.Nombre}</span>
              <div className="productos-cantidad">
                <p>Cantidad: {producto.cantidad} </p>
              </div>
              <div className="productos-precio">
                {" "}
                <p>Precio: L {producto.Precio}.00 </p>
              </div>
            </div>
          </div>
        ))}
        <h5>Total de la Orden: L {calcularTotal()}.00</h5>
      </div>
      <div style={{ marginTop: "70px" }} />
      <h2>Pantalla de Pago</h2>
      <div className="botones-container">
        <button onClick={() => setMetodoPago("tarjeta")}>
          Pagar con Tarjeta
        </button>
        <button onClick={handlePagoEfectivo}>Pagar en Efectivo</button>
        {mostrarPopup && <PopupPagoEfectivo />}
        {mostrarPopupGraciasComponente()}
      </div>

      {metodoPago === "tarjeta" && mostrarFormularioTarjeta()}
      {metodoPago === "transferencia" && mostrarInformacionTransferencia()}
    </div>
  );
}

export default Pago;
