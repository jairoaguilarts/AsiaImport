import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import PromoAsia from "../../imagenes/PromoAsia.jpeg";
import PromocionAsia from "../../imagenes/PromocionAsia.jpg";
import parlantesImage from "../../assets/parlantes.png";
import audifonosImage from "../../assets/audifonos.png";
import botestermosImage from "../../assets/botestermos.png";
import cargadoresImage from "../../assets/cargadores.png";
import relojesImage from "../../assets/relojes.png";
import otrosImage from "../../assets/otros.png";
import parlanteProduct from "../../assets/Parlante Bluetooth.png";
import radio from "../../assets/Radio Recargable.png";
import audifonosProduct from "../../assets/Audifonos UltraSound.png";
import CobertoresImage from "../../assets/CobertoresCelular.png";
import vidriosImage from "../../assets/VidriosCelular.png";
import yeti from "../../assets/Yeti Fake.png";
import "./Inicio.css";

const productos = [
  {
    imagen: parlanteProduct,
    nombre: "Parlante Bluetooth con Luz Led",
    precio: "L. 849",
  },
  {
    imagen: radio,
    nombre: "Radio Recargable con Panel Solar",
    precio: "L. 499",
  },
  {
    imagen: audifonosProduct,
    nombre: "Audifonos UltraSound inalambricos",
    precio: "L. 2,449",
  },
  { imagen: yeti, nombre: "Vasos Termicos Yeti", precio: "L. 349" },
];

//funcion de subir imagen a firebase
/*const uploadImage = (file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`images/${file.name}`);

  return fileRef.put(file).then(() => {
    console.log("Imagen subida correctamente");
    return fileRef.getDownloadURL(); 
  });
};*/

//funcion de cargar imagen
/*const getImageUrl = (fileName) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`images/${fileName}`);

  return fileRef.getDownloadURL();
};
getImageUrl('nombre-de-tu-imagen.jpg').then(url => {
  console.log('URL de la imagen:', url);
});


const file = document.querySelector("#tu-input-file").files[0];
uploadImage(file).then((url) => {
  console.log("URL de la imagen:", url);
});*/

//Funcion para el control de la lista de productos destacados
const Carrusel = ({ productos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  //Indice anterior en la lista de Productos Destacados
  const handlePrevClick = (e) => {
    e.preventDefault();
    moverCarrusel(-1);
  };

  //Indice siguiente en la lista de Productos Destacados
  const handleNextClick = (e) => {
    e.preventDefault();
    moverCarrusel(1);
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
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>Precio: {producto.precio}</p>
              <button>Agregar al carrito</button>
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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigateToAudifonosFiltro = (categoria) => {
    navigate("/audifonos-filtro", { state: { categoria } });
  };

  return (
    <div className="Inicio">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "auto" }}
            className="d-block w-100"
            src={PromoAsia}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: "100%", height: "auto" }}
            className="d-block w-100"
            src={PromocionAsia}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="product-section">
        <div className="product-container">
          <div className="product-item" onClick={navigateToAudifonosFiltro}>
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
            onClick={navigateToAudifonosFiltro("CARGADORES")}
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
            onClick={navigateToAudifonosFiltro("VIDRIOS")}
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
        </div>
      </div>

      <div className="section-divider">
        <p className="destacado-text"> Articulos Destacados </p>
        <hr className="linea-divisora-blue-large" />
        <Carrusel productos={productos} />
        <hr className="linea-divisora-blue-med" />
      </div>
    </div>
  );
}

export default Inicio;
