import React,{ useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem'
import asiaImport from '../imagenes/asiaImport.png';
import PromoAsia from '../imagenes/PromoAsia.jpeg';
import PromocionAsia from '../imagenes/PromocionAsia.jpg';
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
   </div>
  );
}

export default Inicio;