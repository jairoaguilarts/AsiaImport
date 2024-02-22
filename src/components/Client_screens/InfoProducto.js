import React, { useState, useEffect } from "react";
import CustomAlert from "../Informative_screens/CustomAlert";
import "./InfoProducto.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import audifonosProduct1 from "../../assets/Srhythm.png";
import avatar from "../../assets/avatar.png";
import Pagination from "../Client_screens/Pagination";

function InfoAudifonos() {
  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };


  const modelo = localStorage.getItem("Modelo");

  const [activeTab, setActiveTab] = useState("description");
  const [producto, setProducto] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");
  const [isAgregarR, setIsAgregarR] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [sum, setSum] = useState(0);

  const [resenas, setResenas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reseñasPorPagina = 3; // Definir el número de reseñas por página
  const indexOfLastReview = currentPage * reseñasPorPagina;
  const indexOfFirstReview = indexOfLastReview - reseñasPorPagina;
  const currentReviews = resenas.slice(indexOfFirstReview, indexOfLastReview);
  const fetchResenas = async () => {
    try {
      const response = await fetch(`https://importasia-api.onrender.com/cargarResenas?Modelo=${modelo}`);
      if (!response.ok) {
        mostrarAlerta("No se pudieron obtener las resenas", "danger");
      } else {
        setResenas(await response.json());
      }
    } catch (error) {
      mostrarAlerta("Error al cargar resenas", "dander");
    }
  };

  useEffect(() => {
    if (resenas.length > 0) {
      let suma = 0;
      for (let i = 0; i < resenas.length; i++) {
        suma += parseInt(resenas[i].Calificacion);
      }
      const promedio = suma / resenas.length;
      const promedioRedondeado = promedio.toFixed(1);
      setSum(promedioRedondeado);
    }
  }, [resenas]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://importasia-api.onrender.com/buscarProductoModelo?Modelo=${modelo}`
        );
        const data = await response.json();
        if (!response.ok) {
          mostrarAlerta("El producto no se ha encontrado", "danger");
        }
        setProducto(data);
      } catch (error) {
        mostrarAlerta("Error al visualizar Producto", "danger");
      }
    };

    fetchResenas();
    fetchProduct();
  }, []);

  const handleAgregarResena = async () => {
    const userFirebaseUID = localStorage.getItem("FireBaseUID");
    const Modelo = modelo;

    const data = {
      userFirebaseUID,
      Modelo,
      Calificacion: calificacion,
      Titulo: titulo,
      Comentario: comentario,
    };

    const response = await fetch('https://importasia-api.onrender.com/agregarResena',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Muchas gracias por tu comentario!",
        text: "Nos ayuda a brindar los mejores productos a nuestros usuarios.",
      });
      fetchResenas();
      setIsAgregarR(false);
      setCalificacion(0);
      setTitulo("");
      setComentario("");
    }
  };

  const handleAgregar = async () => {
    const firebaseUID = localStorage.getItem("FireBaseUID");
    const Modelo = modelo;

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarCarrito",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firebaseUID, Modelo }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      Swal.fire({
        icon: 'success',
        title: '¡Agregado aL Carrito !',
        text: 'Producto agregado exitosamente al carrito.',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.log("Error: ", error);
      Swal.fire({
        icon: 'warning',
        text: 'No se pudo agregar el producto a al carrito.',
        text: 'Revisa si ya lo habias agregado anteriormente',
        confirmButtonText: 'Ok'
      });
    }
  };
  const handleAgregarFavoritos = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar,
    };
  
    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarFavoritos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      Swal.fire({
        icon: 'success',
        title: '¡Agregado a Favoritos!',
        text: 'Producto agregado exitosamente a favoritos.',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el producto a favoritos.',
        text: 'Revisa si ya lo habias agregado anteriormente',
        confirmButtonText: 'Ok'
      });
      console.log("Error: ", error);
    }
  };

  return (
    <div className="App">
      {showAlert && (
        <CustomAlert
          className="alerta"
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}
      {producto && (
        <div className="product-section">
          <div className="product-image-container">
            <img
              src={producto.ImagenID}
              alt="Audífonos"
              className="product-image"
            />
          </div>
          <div className="product-info-container">
            <div className="product-info">
              <div className="product-title">{producto.Nombre}</div>
              <div className="product-rating"> {sum} ({resenas.length} reseñas)</div>
              <div className="product-price">
                L {producto.Precio}.00 ISV incluido
              </div>
            </div>
            <div className="product-buttons">
              <button className="btn-cart2" onClick={() => handleAgregar()}>
                AÑADIR AL CARRITO
              </button>
              <button className="btn-favorite2" onClick={() =>handleAgregarFavoritos(producto.Modelo)}>
              AGREGAR A FAVORITOS
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="tab-header">
        <button
          onClick={() => setActiveTab("description")}
          className={activeTab === "description" ? "active" : ""}
        >
          Descripción
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={activeTab === "features" ? "active" : ""}
        >
          Características
        </button>
      </div>
      {producto && (
        <div className="tab-content">
          {activeTab === "description" && (
            <div className="description">
              <h2>Descripción</h2>
              <ul className="product-description">
                {producto.Descripcion}
              </ul>
            </div>
          )}
          {activeTab === "features" && (
            <div className="features">
              <h2>Características</h2>
              <ul className="product-features">
                {producto.Caracteristicas}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="tab-content">
        <button className="agregar-resena" onClick={() => setIsAgregarR(true)}>
          Agregar Reseña
        </button>
        {isAgregarR && (
          <>
            <p>Titulo</p>
            <Form.Control
              id="Titulo"
              className="contenedores"
              type="text"
              placeholder="Ingrese un titulo para la reseña"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <>
              <div class="rating">
                <input value="5" name="rate" id="star5" type="radio" checked={calificacion === 5} onChange={() => setCalificacion(5)} />
                <label title="text" for="star5"></label>
                <input value="4" name="rate" id="star4" type="radio" checked={calificacion === 4} onChange={() => setCalificacion(4)} />
                <label title="text" for="star4"></label>
                <input value="3" name="rate" id="star3" type="radio" checked={calificacion === 3} onChange={() => setCalificacion(3)} />
                <label title="text" for="star3"></label>
                <input value="2" name="rate" id="star2" type="radio" checked={calificacion === 2} onChange={() => setCalificacion(2)} />
                <label title="text" for="star2"></label>
                <input value="1" name="rate" id="star1" type="radio" checked={calificacion === 1} onChange={() => setCalificacion(1)} />
                <label title="text" for="star1"></label>
              </div>
            </>
            <p>Comentario</p>
            <Form.Control
              id="comentario"
              className="contenedores"
              type="text"
              as="textarea"
              placeholder="Ingrese un comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <button className="agregar-resena" onClick={handleAgregarResena}>
              Agregar
            </button>


          </>
        )}
      </div>
      <div className="resenas-container">
        {resenas.length > 0 ? (
          currentReviews.map((resena, index) => (
            <div key={index} className="resena">
              <div className="resena-usuario">
                <img src={avatar} alt="Avatar" className="resena-avatar" />
                {resena.Nombre}
              </div>
              <div className="resena-titulo-calificacion"> {/* Contenedor para el título y la calificación */}
                <strong className="resena-titulo">{resena.Titulo}</strong>
                <span className="resena-calificacion"> {/* Usa span para la calificación */}
                  {'★'.repeat(resena.Calificacion)}
                  {'☆'.repeat(5 - resena.Calificacion)}
                </span>
              </div>
              <div className="resena-comentario">{resena.Comentario}</div>
            </div>
          ))
        ) : (
          <div>No hay reseñas aún</div>

        )}

      </div>
      <Pagination
        productsPerPage={reseñasPorPagina}
        totalProducts={resenas.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />

    </div>
  );
}

export default InfoAudifonos;
