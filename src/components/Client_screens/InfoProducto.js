import React, { useState, useEffect } from "react";
import CustomAlert from "../Informative_screens/CustomAlert";
import "./InfoProducto.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import audifonosProduct1 from "../../assets/Srhythm.png";

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

    if(response.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Muchas gracias por tu comentario!",
        text: "Nos ayuda a brindar los mejores productos a nuestros usuarios.",
      });
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
      mostrarAlerta("Agregado al carrito con éxito", "success");
    } catch (error) {
      console.log("Error: ", error);
      mostrarAlerta("Error al agregar al carrito", "danger");
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
              <div className="product-rating">★★★★☆ 4.8 (90 reseñas)</div>
              <div className="product-price">
                L {producto.Precio}.00 ISV incluido
              </div>
            </div>
            <div className="product-buttons">
              <button className="btn-cart2" onClick={() => handleAgregar()}>
                AÑADIR AL CARRITO
              </button>
              <button className="btn-favorite2">AGREGAR A FAVORITOS</button>
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
    </div>
  );
}

export default InfoAudifonos;
