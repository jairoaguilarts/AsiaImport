
import React, { useState } from 'react';

import './InfoG.css'; // Make sure the path is correct

// You can import your images like this
import iconMission from '../assets/mission.png';
import iconInnovation from '../assets/innovation.png';
import iconVision from '../assets/visionary.png';
import iconHistoria from '../assets/history-book.png';
import iconL from '../assets/leadership.png';
import iconR from '../assets/hand-shake.png';
import iconS from '../assets/charity.png';
import iconJ from '../assets/balance.png';
const InfoG = () => {
  // Define your card and value data here, for example
  const [expandedInfo, setExpandedInfo] = useState({});
  const toggleExpansion = (index) => {
    setExpandedInfo(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const cardsData = [
    {
      title: 'Misión',
      description: 'Proveer a nuestros clientes una amplia gama de accesorios para teléfonos y artículos tecnológicos de alta calidad y vanguardia,',
      descriptionC:' importados directamente de los mejores fabricantes de Asia. Nos comprometemos a ofrecer los mejores precios del mercado, garantizando una experiencia de compra excepcional, con un servicio al cliente inigualable y una atención personalizada que entiende y satisface las necesidades tecnológicas de una sociedad en constante evolución.',
      icon: iconMission, // This should be the path to your image
    },
    {
        title: 'Vision',
        description: 'Ser la empresa líder en importación y distribución de accesorios para teléfonos y artículos tecnológicos en Honduras....',
        descriptionC:'reconocida por su excelencia operativa y su capacidad para anticiparse y adaptarse a las tendencias del mercado. Aspiramos a ser el punto de referencia para los consumidores que buscan innovación, calidad y precios accesibles, expandiendo nuestra presencia a nivel nacional e internacional y fomentando la tecnología accesible como pilar de un futuro conectado y dinámico.',
        icon: iconVision, // This should be the path to your image
      },
      {
        title: 'Historia',
        description: 'En 2022, noté una creciente demanda de accesorios para dispositivos electrónicos y una oportunidad de mercado debido....',
        descriptionC:' a los altos precios locales. Conversando con amigos, confirmé que los precios eran prohibitivos en comparación con opciones en línea o internacionales. Esto me motivó a contactar a un fabricante y negociar precios ventajosos, permitiéndome ofrecer productos asequibles en mi país y posibilitando que otros emprendieran en la reventa. Conseguí un crédito del fabricante, lo que me dio libertad financiera para enfocarme en la calidad y estrategia de comercialización. Tuve la suerte de encontrar un local comercial ideal para abrir mi tienda, en un espacio ofrecido por un comerciante jubilado. Este fue el comienzo de mi viaje empresarial, buscando no solo rentabilidad sino democratizar el acceso a la tecnología y fomentar el emprendimiento en mi comunidad. Con una filosofía de equidad y accesibilidad, mi empresa empezó a ganar la confianza de los clientes, sentando las bases para lo que espero sea una historia de éxito e innovación.',
        icon: iconHistoria, // This should be the path to your image
      }
    // ... other cards
  ];

  const valuesData = [
    {
      title: 'Innovación',
      icon: iconInnovation, // This should be the path to your image
    },
    {
        title: 'Liderazgo',
        icon: iconL, // This should be the path to your image
      }, {
        title: 'Responsabilidad',
        icon: iconR, // This should be the path to your image
      }, {
        title: 'Solidaridad',
        icon: iconS, // This should be the path to your image
      }, {
        title: 'Justicia',
        icon: iconJ, // This should be the path to your image
      }
    // ... other values
  ];

  return (
    <div className="information-container">
      <div className="information-header">INFORMACION</div>
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div key={index} className="card">
            <img src={card.icon} alt={card.title} className="card-icon" />
            <div className="card-title">{card.title}</div>
            <div className="card-description">
              {card.description}
              {expandedInfo[index] && (
                <div className="additional-info">
                  {/* Aquí puedes poner más información sobre la tarjeta */}
                  {card.descriptionC}
                 
                </div>
              )}
            </div>
            <a href="#!" className="card-link" onClick={(e) => {
              e.preventDefault();
              toggleExpansion(index);
            }}>
              {expandedInfo[index] ? 'Ver menos' : 'Ver más'}
            </a>
          </div>
        ))}
      </div>
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div key={index} className="value">
            <img src={value.icon} alt="" className="value-icon" />
            <div className="value-title">{value.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoG;
