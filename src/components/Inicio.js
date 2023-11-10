import React,{ useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
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
import './Inicio.css';

function Inicio() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  return (
    <div className="Inicio">
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img style={{height:'70vh'}}
        className="d-block w-100" src={PromoAsia}  alt="First slide"/>
      </Carousel.Item>
      <Carousel.Item>< img style={{height:'70vh'}}
        className="d-block w-100" src={PromocionAsia}  alt="First slide"/>
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
   </div>
  );
}

export default Inicio;