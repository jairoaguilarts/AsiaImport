import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import parlantesImage from "../../assets/parlantes.png";
import audifonosImage from "../../assets/audifonos.png";
import botestermosImage from "../../assets/botestermos.png";
import cargadoresImage from "../../assets/cargadores.png";
import relojesImage from "../../assets/relojes.png";
import CobertoresImage from "../../assets/CobertoresCelular .png";
import otrosimg from "../../assets/otros.png";
import vidriosImage from "../../assets/VidriosCelular.png";
import "./Inicio.css";

const Carrusel = ({ productos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navegarProcederCompra = () => {
    navigate("/procederCompra");
  };

  const navigate = useNavigate();
  const itemsVisibles = 4;

  const mostrarProductos =
    productos.length < itemsVisibles
      ? productos
      : productos
          .concat(productos)
          .slice(currentIndex, currentIndex + itemsVisibles);

  const moverCarrusel = (direccion) => {
    const totalItems = productos.length;
    let newIndex = (currentIndex + direccion + totalItems) % totalItems;

    setCurrentIndex(newIndex);
  };

  const handleAgregar = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar,
    };

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarCarrito",
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
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    moverCarrusel(-1);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    moverCarrusel(1);
  };
  const handleDetalles = (modelo) => {
    localStorage.setItem("Modelo", modelo);
    navigate("/info-producto");
  };

  return (
    <div className="destacado-container">
      <div className="destacado-product-container">
        <button className="prev-btn" onClick={handlePrevClick}>
          &#9664;
        </button>
        <div className="destacado-lista">
          {mostrarProductos.map((producto, index) => (
            <div key={index} className="elemento">
              <button
                className="boton-detalles"
                onClick={() => handleDetalles(producto.modelo)}
              >
                <img src={producto.imagen} alt={producto.Nombre} />
              </button>
              <h3>{producto.nombre}</h3>
              <p>Precio: {producto.precio}</p>
              <button
                className="boton-Agrega"
                onClick={() => handleAgregar(producto.modelo)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
        <button className="next-btn" onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

function Inicio() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => setOpen(!open);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [imagenesCarrusel, setImagenesCarrusel] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigateToAudifonosFiltro = (categoria) => {
    navigate("/producto-filtro", { state: { categoria } });
  };

  useEffect(() => {
    fetch("https://importasia-api.onrender.com/productosP")
      .then((response) => response.json())
      .then((data) => {
        const productosDestacados = data
          .filter((product) => product.Destacado)
          .map((product) => ({
            imagen: product.ImagenID[0],
            nombre: product.Nombre,
            precio: "L " + product.Precio + ".00",
            modelo: product.Modelo,
          }));
        setProductosDestacados(productosDestacados);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const obtenerCarrusel = async () => {
      try {
        const response = await fetch(
          `https://importasia-api.onrender.com/obtenerCarruselInicio`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Aqui hay un error", errorData);
          throw new Error(`Error: ${errorData.message || response.status}`);
        }

        const data = await response.json();
        setImagenesCarrusel(data[0].imagenID);
      } catch (error) {
        console.log("Adentro del catch " + error.message);
      }
    };

    obtenerCarrusel();
  }, []);

  return (
    <div className="inicio-container">
      <div className="banner-container">
        {imagenesCarrusel && (
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {imagenesCarrusel.map((imagen, idx) => (
              <Carousel.Item key={idx}>
                <img
                  style={{ width: "100%", height: "610px" }}
                  className="d-block w-100"
                  src={imagen}
                  alt={`Slide ${idx + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
      <div className="section-divider">
        <p className="destacado-text"> Categorias </p>
        <hr className="linea-divisora-blue-large" />
      </div>
      <div className="product-section">
        <div className="product-container">
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("PARLANTE")}
          >
            <img src={parlantesImage} alt="Parlantes" />
            <p>Parlantes</p>
          </div>
          {/* Actualización para el botón de Audífonos */}
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("AURICULARES")}
          >
            <img src={audifonosImage} alt="Audífonos" />
            <p>Audífonos</p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("BOTES")}
          >
            <img src={botestermosImage} alt="Botes y Termos" />
            <p>Botes y Termos</p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("CARGADORES")}
          >
            <img src={cargadoresImage} alt="Cargadores para móvil" />
            <p>Cargadores para móvil</p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("SMARTWATCH")}
          >
            <img src={relojesImage} alt="Relojes Inteligentes" />
            <p>Relojes </p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("VIDRIO TEMPLADO")}
          >
            <img src={vidriosImage} alt="Otros" />
            <p>Vidrios</p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("COBERTORES")}
          >
            <img src={CobertoresImage} alt="Cobertores" />
            <p>Cobertores </p>
          </div>
          <div
            className="product-item"
            onClick={() => navigateToAudifonosFiltro("OTROS")}
          >
            <img src={otrosimg} alt="Otros" />
            <p>Otros </p>
          </div>
        </div>
      </div>
      <hr />

      <div className="section-divider">
        <p className="destacado-text">Artículos Destacados</p>
        <hr className="linea-divisora-blue-large" />
        <Carrusel productos={productosDestacados} />
        <hr className="linea-divisora-blue-med" />
      </div>
    </div>
  );
}

export default Inicio;
