import React, { useState } from 'react';
import './infoAudifonos.css';
import audifonosProduct1 from "../../assets/Srhythm.png";

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
            <div className="product-title">Audífonos Sony WH1000XM4 Noise Cancelling Beige</div>
            <div className="product-rating">★★★★☆ 4.8 (90 reseñas)</div>
            <div className="product-price">L 3800.00 ISV incluido</div>
            <p>Los intuitivos e inteligentes audífonos WH-1000XM4</p>
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
          <div className="description">
            <h2>Descripción</h2>
            <ul>
              <li>La tecnología noise cancelling líder del sector con 2 procesadores de alto rendimiento y 8 micrófonos.</li>
              <li>Calidad de sonido excepcional con una unidad de diafragma de 30 mm especialmente diseñada.</li>
              <li>Llamadas sin ruido excelentes con 2x2 micrófonos multidireccionales y sistema de reducción de ruido (con IA).</li>
            </ul>
          </div>
        )}
        {activeTab === 'features' && (
          <div className="features">
            <table>
              <tbody>
                <tr><td>Audio</td><td>Color Negro, Cancelación de Sonido Sí, True Wireless Sí</td></tr>
                <tr><td>Conectividad</td><td>Bluetooth Sí, Conexión inalámbrica Sí</td></tr>
                <tr><td>Entradas de Audio</td><td>Micrófono Sí</td></tr>
                <tr><td>Características Generales</td><td>Tipo de audífonos Over Ear Inalámbrico</td></tr>
                <tr><td>Duración de batería</td><td>Hasta 24 Horas, Tiempo de carga 3.5 Horas</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoAudifonos;
