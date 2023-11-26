import React from 'react';
import './Fa.css';
import checkIcon from '../../assets/quality.png'; 
import discountIcon from '../../assets/sale.png'; 
import returnIcon from '../../assets/return.png'; 
import warrantyIcon from '../../assets/safe.png'; 
import originIcon from '../../assets/maneki-neko.png'; 

function Fa() {
  return (
    <div className="faq-container">
      <h2 className="faq-title">PREGUNTAS FRECUENTES</h2>
      <div className="faq-section">
        <img src={checkIcon} alt="Confianza" className="faq-icon" />
        <div className="faq-content">
          <h3>¿Qué tan confiables son sus Productos?</h3>
          <p>Nos preocupamos por siempre ofrecer la mejor calidad en nuestros productos, garantizando la durabilidad en cada uno de ellos.</p>
        </div>
      </div>
      <div className="faq-section">
        <img src={discountIcon} alt="Descuento" className="faq-icon" />
        <div className="faq-content">
          <h3>¿Hay algún descuento disponible para Mayoristas?</h3>
          <p>Sí, ofrecemos descuentos para mayoristas, entre más productos adquieran mayor descuento.</p>
        </div>
      </div>
      <div className="faq-section">
        <img src={originIcon} alt="Origen" className="faq-icon" />
        <div className="faq-content">
          <h3>¿De dónde traen sus productos?</h3>
          <p>De Asia</p>
        </div>
      </div>
      <div className="faq-section">
        <img src={returnIcon} alt="Devoluciones" className="faq-icon" />
        <div className="faq-content">
          <h3>¿Ofrecen devoluciones?</h3>
          <p>Sí, Asian Import ofrece devoluciones de 30 días. Si el producto se encuentra en malas condiciones por defectos de fábrica le devolvemos su dinero.</p>
        </div>
      </div>
      <div className="faq-section">
        <img src={warrantyIcon} alt="Garantía" className="faq-icon" />
        <div className="faq-content">
          <h3>¿Ofrecen garantía?</h3>
          <p>Sí, Asian Import ofrece garantía en todos sus productos. Si su producto se daña durante el envío, lo reemplazaremos.</p>
        </div>
      </div>
    </div>
  );
}

export default Fa;
