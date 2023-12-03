import React, { useState, useEffect } from "react";
import CustomAlert from "../Informative_screens/CustomAlert";
import "./InfoProducto.css";
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
        console.log(data);
        setProducto(data);
      } catch (error) {
        mostrarAlerta("Error al visualizar Producto", "danger");
      }
    };

    fetchProduct();
  }, []);

  console.log(modelo);

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
                L {producto.Precio} ISV incluido
              </div>
              <p>{producto.Descripcion}</p>
            </div>
            <div className="product-buttons">
              <button className="btn-cart">AÑADIR AL CARRITO</button>
              <button className="btn-favorite">AGREGAR A FAVORITOS</button>
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
              <ul>{producto.Descripcion}</ul>
            </div>
          )}
          {activeTab === "features" && (
            <div className="features">
              <table>
                <tbody>{producto.Caracteristica}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InfoAudifonos;