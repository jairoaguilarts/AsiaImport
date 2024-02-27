import React, { useState, useEffect } from "react";
import "./GestionOrdenes.css";
import Pagination from "../Client_screens/Pagination";
import Swal from "sweetalert2";

const GestionOrdenes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [ordenActual, setOrdenActual] = useState(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [ordenes, setOrdenes] = useState([]);
  const [isDetallePopupVisible, setIsDetallePopupVisible] = useState(false);
  const [ordenDetalle, setOrdenDetalle] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Cualquiera");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const handleBusquedaChange = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    filtrarOrdenes(terminoBusqueda, filtroEstado);
  };

  const handleEstadoChange = (e) => {
    const estadoSeleccionado = e.target.value;
    setFiltroEstado(estadoSeleccionado);
    filtrarOrdenes(busqueda, estadoSeleccionado);
  };

  const filtrarOrdenes = (terminoBusqueda, estado) => {
    let ordenesTemp = ordenes;

    if (terminoBusqueda) {
      ordenesTemp = ordenesTemp.filter((orden) => {
        const busquedaEnMinusculas = terminoBusqueda.toLowerCase();
        const detalles = orden.detalles || {};

        // Revisa si algún campo de la orden coincide con el término de búsqueda
        const coincide = orden._id?.toLowerCase().includes(busquedaEnMinusculas) ||
          orden.tipoOrden?.toLowerCase().includes(busquedaEnMinusculas) ||
          orden.estadoOrden?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.numerotelefono?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.departamento?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.municipio?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.direccion?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.puntoreferencia?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.numerotelefono?.toLowerCase().includes(busquedaEnMinusculas) ||
          orden.nombre_usuario?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.fecha_ingreso?.toLowerCase().includes(busquedaEnMinusculas) ||
          orden.Fecha?.toLowerCase().includes(busquedaEnMinusculas) ||
          detalles.identidadUsuario?.toLowerCase().includes(busquedaEnMinusculas) ||
          orden.estadoPago?.toLowerCase().includes(busquedaEnMinusculas);

        // Asumiendo que `carrito` es un array que puede contener strings u objetos con un campo 'nombreArticulo'
        const articulosEnCarrito = orden.carrito?.some((item) => {
          const nombreArticulo = typeof item === 'string' ? item : item.nombreArticulo;
          return nombreArticulo?.toLowerCase().includes(busquedaEnMinusculas);
        });

        return coincide || articulosEnCarrito;
      });
    }

    if (estado !== "Cualquiera") {
      ordenesTemp = ordenesTemp.filter((orden) => orden.estadoOrden === estado);
    }
    setCurrentPage(1);
    setOrdenesFiltradas(ordenesTemp);
  };


  useEffect(() => {
    setOrdenesFiltradas(ordenes);
  }, [ordenes]);

  useEffect(() => {
    fetch(`https://importasia-api.onrender.com/ordenes`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
        throw response;
      })
      .then((data) => {
        // Asegúrate de que la fecha de ingreso esté en un formato adecuado para comparar
        const ordenesOrdenadas = data.sort((a, b) => new Date(b.detalles.fecha_ingreso) - new Date(a.detalles.fecha_ingreso));
        setOrdenes(ordenesOrdenadas);
      })
      .catch((error) => {
        console.error("Error al recuperar las órdenes:", error);
      });
  }, []);
  

  const mostrarPopupDetalle = (orden) => {
    setOrdenDetalle(orden);
    setIsDetallePopupVisible(true);
  };

  const PopupDetalleOrden = () => {
    if (!isDetallePopupVisible || !ordenDetalle) return null;

    return (
      <div className="popup-overlay">
        <div className="popup-detalle">
          <h3>Detalles de la Orden</h3>
          <hr></hr>
          <ul>
            <li>ID_Orden: {ordenDetalle._id}</li>
            <li>Tipo: {ordenDetalle.tipoOrden}</li>
            {ordenDetalle.tipoOrden === "delivery" && (
              <>
                <li>Departamento: {ordenDetalle.detalles.departamento}</li>
                <li>Municipio: {ordenDetalle.detalles.municipio}</li>
                <li>Dirección: {ordenDetalle.detalles.direccion}</li>
                <li>Punto de Referencia: {ordenDetalle.detalles.puntoreferencia}</li>
              </>
            )}
            <li>Teléfono: {ordenDetalle.detalles.numerotelefono}</li>
            <li>Nombre de Usuario: {ordenDetalle.nombre_usuario}</li>
            {ordenDetalle.tipoOrden === "pickup" && (
              <li>Identidad de Usuario: {ordenDetalle.detalles.identidadUsuario}</li>
            )}
            <li>Fecha: {new Date(ordenDetalle.detalles.fecha_ingreso).toLocaleDateString()}</li>
            <li>Estado: <span className={getEstadoClass(ordenDetalle.estadoOrden)}>{ordenDetalle.estadoOrden}</span></li>
            <li>Estado Pago: {ordenDetalle.estadoPago}</li>
          </ul>
          <div>
            <strong>Articulos en la Orden:</strong>
          </div>
          <table>
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {ordenDetalle.carrito.map((item, index) => (
                <tr key={index}>
                  <td>{ordenDetalle.carrito[index]}</td>
                  <td>{ordenDetalle.cantidades[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <strong>Total de la Orden:{ordenDetalle.total}</strong>
          </div>
          <button className="button-detalle3" onClick={() => setIsDetallePopupVisible(false)}>Cerrar</button>
        </div>
      </div>
    );
  };

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
            <label
              style={{
                color:
                  estadoSeleccionado === "En Proceso" ? "#D8750D" : "inherit",
              }}
            >
              <input
                type="radio"
                name="estado"
                value="En Proceso"
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                checked={estadoSeleccionado === "En Proceso"}
              />
              En proceso
            </label>
            <label
              style={{
                color:
                  estadoSeleccionado === "Verificada" ? "#D8A20D" : "inherit",
              }}
            >
              <input
                type="radio"
                name="estado"
                value="Verificada"
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                checked={estadoSeleccionado === "Verificada"}
              />
              Verificada
            </label>
            <label
              style={{
                color:
                  estadoSeleccionado === "Completada" ? "green" : "inherit",
              }}
            >
              <input
                type="radio"
                name="estado"
                value="Completada"
                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                checked={estadoSeleccionado === "Completada"}
              />
              Completado
            </label>
            <button type="button" onClick={actualizarEstado}>
              Actualizar Estado
            </button>
            <button type="button" onClick={() => setIsPopupVisible(false)}>
              Cerrar
            </button>
          </form>
        </div>
      </div>
    ) : null;
  };

  const getEstadoClass = (estado) => {
    switch (estado) {
      case "En Proceso":
        return "estado-en-proceso";
      case "Verificada":
        return "estado-verificada";
      case "Completada":
        return "estado-completado";
      default:
        return "";
    }
  };

  const actualizarEstado = () => {
    const url = `https://importasia-api.onrender.com/actualizarEstado`;
    const data = {
      estadoNuevo: estadoSeleccionado,
      _orderId: ordenActual._id,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Estado actualizado:", data);
        Swal.fire({
          icon: 'success',
          title: '¡Estado actualizado con exito!',
          text: 'Estado de la orden ha sido actualizado exitosamente',
          confirmButtonText: 'Ok'
        });
        setIsPopupVisible(false);
        setOrdenes(
          ordenes.map((orden) =>
            orden._id === ordenActual._id
              ? { ...orden, estadoOrden: estadoSeleccionado }
              : orden
          )
        );
      })
      .catch((error) => {
        console.error("Error al actualizar estado:", error);
      });
  };

  const obtenerDetalles = (orden) => {
    if (orden.tipoOrden === "pickup") {
      return (
        <>
          <div>Nombre: {orden.detalles.nombreUsuario || "N/A"}</div>
          <div>Identidad: {orden.detalles.identidadUsuario || "N/A"}</div>
          <div>Teléfono: {orden.detalles.numerotelefono || "N/A"}</div>
        </>
      );
    } else if (orden.tipoOrden === "delivery") {
      return (
        <>
          <div>Departamento: {orden.detalles.departamento || "N/A"}</div>
          <div>Municipio: {orden.detalles.municipio || "N/A"}</div>
          <div>Dirección: {orden.detalles.direccion || "N/A"}</div>
        </>
      );
    }
    return <div>Detalles no disponibles</div>;
  };

  // Función para manejar el cambio de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Lógica para obtener las órdenes actuales según la página
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordenesFiltradas.slice(indexOfFirstOrder, indexOfLastOrder);

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
      <input
        type="text"
        placeholder="Buscar Orden"
        value={busqueda}
        onChange={handleBusquedaChange}
        className="barra-busqueda"
      />
      <div className="filtro-estados-container">
        <select
          className="filtro-estados-select"
          value={filtroEstado}
          onChange={handleEstadoChange}
        >
          <option value="Cualquiera">Todas</option>
          <option value="Ingresada">Ingresada</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Verificada">Verificada</option>
          <option value="Completada">Completada</option>
        </select>
      </div>
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
            {currentOrders.map((orden) => (
              <tr key={orden._id}>
                <td>{orden._id}</td>
                <td>{orden.tipoOrden}</td>
                <td>{orden.detalles ? obtenerDetalles(orden) : "N/A"}</td>
                <td className={getEstadoClass(orden.estadoOrden)}>
                  {orden.estadoOrden}
                </td>
                <td>{orden.Fecha}</td>
                <td>
                  <button
                    className="button-gestion mod-estado-orden"
                    onClick={() => mostrarPopup(orden)}
                  >
                    Estado de Orden
                  </button>
                  <button
                    className="button-gestion mod-ver-mas"
                    onClick={() => mostrarPopupDetalle(orden)}
                  >
                    Ampliar Orden
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        productsPerPage={ordersPerPage}
        totalProducts={ordenesFiltradas.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <PopupEstadoOrden />
      <PopupDetalleOrden />
    </div>
  );
};

export default GestionOrdenes;
