import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Button, Collapse } from 'react-bootstrap';
import CarouselItem from 'react-bootstrap/CarouselItem'
import asiaImport from '../imagenes/asiaImport.png';
import PromoAsia from '../imagenes/PromoAsia.jpeg';
import PromocionAsia from '../imagenes/PromocionAsia.jpg';
import parlantesImage from '../assets/parlantes.png';
import audifonosImage from '../assets/audifonos.png';
import botestermosImage from '../assets/botestermos.png';
import cargadoresImage from '../assets/cargadores.png';
import relojesImage from '../assets/relojes.png';
import otrosImage from '../assets/otros.png';
import parlanteProduct from '../assets/Parlante Bluetooth.png';
import radio from '../assets/Radio Recargable.png';
import audifonosProduct from '../assets/Audifonos UltraSound.png';
import yeti from '../assets/Yeti Fake.png';
import './Inicio.css';

const productos = [
  { imagen: parlanteProduct, nombre: 'Parlante Bluetooth con Luz Led', precio: 'L. 849' },
  { imagen: radio, nombre: 'Radio Recargable con Panel Solar', precio: 'L. 499' },
  { imagen: audifonosProduct, nombre: 'Audifonos UltraSound inalambricos', precio: 'L. 2,449' },
  { imagen: yeti, nombre: 'Vasos Termicos Yeti', precio: 'L. 349' }

];

//Funcion para el control de la lista de productos destacados
const Carrusel = ({ productos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsVisibles = 4;

  const mostrarProductos = productos.length < itemsVisibles
    ? productos
    : productos.concat(productos).slice(currentIndex, currentIndex + itemsVisibles);

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
        <button className="prev-btn" onClick={handlePrevClick}>&#9664;</button>
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
        <button className="next-btn" onClick={handleNextClick}>&#9654;</button>
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

  return (
    <div className="Inicio">

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img style={{ width: '100%', height: 'auto' }}
            className="d-block w-100" src={PromoAsia} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>< img style={{ width: '100%', height: 'auto' }}
          className="d-block w-100" src={PromocionAsia} alt="First slide" />
        </Carousel.Item>
      </Carousel>
      <div className="product-section">
        <div className="product-container">
          <a href="/parlantes" className="product-item">
            <img src={parlantesImage} alt="Parlantes" />
            <p>Parlantes</p>
          </a>
          <a href="/audifonos" className="product-item">
            <img src={audifonosImage} alt="Audífonos" />
            <p>Audífonos</p>
          </a>
          <a href="/botestermos" className="product-item">
            <img src={botestermosImage} alt="Botes y Termos" />
            <p>Botes y Termos</p>
          </a>
          <a href="/cargadores" className="product-item">
            <img src={cargadoresImage} alt="Cargadores para móvil" />
            <p>Cargadores para móvil</p>
          </a>
          <a href="/relojesinteligentes" className="product-item">
            <img src={relojesImage} alt="Relojes Inteligentes" />
            <p>Relojes Inteligentes</p>
          </a>
          <a href="/otros" className="product-item">
            <img src={otrosImage} alt="Otros" />
            <p>Otros</p>
          </a>
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