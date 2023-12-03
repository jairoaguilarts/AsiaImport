import React, { useState } from 'react';
import './infoAudifonos.css';
import audifonosProduct1 from "../../assets/Srhythm.png";;

function InfoAudifonos() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="App">
      <div className="product-section">
        <div className="product-image-container">
          <img src={audifonosProduct1} alt="Audífonos" className="product-image" />
        </div>
        <div className="product-info-container">
          <div className="product-info">
            <div className="product-title">Audífonos Sony /WH1000XM4 /Noise Cancelling/Beige</div>
            <div className="product-rating">★★★★☆ 4.8 (90 reseñas)</div>
            <div className="product-price">L 3800.00 ISV incluido</div>
            <p>Los intuitivos e inteligentes audífonos WH-1000XM4 </p>

          </div>
          <div className="product-buttons">
            <button className="btn-cart">AÑADIR AL CARRITO</button>
            <button className="btn-favorite">AGREGAR A FAVORITOS</button>
          </div>
        </div>
      </div>
      <div className="tab-header">
        <button
          onClick={() => setActiveTab('description')}
          className={activeTab === 'description' ? 'active' : ''}
        >
          Descripción
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={activeTab === 'features' ? 'active' : ''}
        >
          Características
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="description-content">
            <h2>Descripción</h2>
            <p>La tecnología noise cancelling líder del sector con 2 procesadores de alto rendimiento y 8 micrófonos.</p>
            <p>Calidad de sonido excepcional con una unidad de diafragma de 30 mm especialmente diseñada.</p>
            <p>Llamadas sin ruido excelentes con 2x2 micrófonos multidireccionales y sistema de reducción de ruido (con IA).</p>
            <p>Los audífonos WH-1000XM5 redefinen la escucha sin distracciones y la claridad en las llamadas gracias a dos procesadores que controlan 8 micrófonos, un optimizador NC automático para optimizar de forma automática la función noise cancelling líder del sector según la colocación y el entorno, y una unidad de diafragma especial.</p>
          </div>
        )}
        {activeTab === 'features' && (
          <div className="features-content">
            <h2>Características</h2>
            <p>Audio: Color Negro, Cancelación de Sonido Sí, True Wireless Sí</p>
            <p>Conectividad: Bluetooth Sí, Conexión inalámbrica Sí</p>
            <p>Entradas de Audio: Micrófono Sí</p>
            <p>Características Generales: Tipo de audífonos Over Ear Inalámbrico</p>
            <p>Duración de batería: Hasta 24 Horas, Tiempo de carga 3.5 Horas</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoAudifonos;
