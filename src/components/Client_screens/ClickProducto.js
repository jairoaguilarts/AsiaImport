import React, { useState } from 'react';
import './ClickProducto.css';

function ClickProducto() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="ClickProducto">
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
            <p>La tecnología noise cancelling líder del sector con 2 procesadores de alto rendimiento y 8 micrófonos.</p>
            <p>Calidad de sonido excepcional con una unidad de diafragma de 30 mm especialmente diseñada.</p>
            <p>Llamadas sin ruido excelentes con 2x2 micrófonos multidireccionales y sistema de reducción de ruido (con IA).</p>
            <p>Los audífonos WH-1000XM5 redefinen la escucha sin distracciones y la claridad en las llamadas gracias a dos procesadores que controlan 8 micrófonos, un optimizador NC automático para optimizar de forma automática la función noise cancelling líder del sector según la colocación y el entorno, y una unidad de diafragma especial.</p>
          </div>
        )}
        {activeTab === 'features' && (
          <div className="features">
            <h2>Características</h2>
            <p>Audio: Color Negro, Cancelación de Sonido Sí, True Wireless Sí.</p>
            <p>Conectividad: Bluetooth Sí, Conexión inalámbrica Sí.</p>
            <p>Entradas de Audio: Micrófono Sí.</p>
            <p>Características Generales: Tipo de audífonos Over Ear Inalámbrico.</p>
            <p>Duración de batería: Hasta 24 Horas, Tiempo de carga 3.5 Horas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClickProducto;
