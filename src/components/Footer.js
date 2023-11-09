// Footer.js
import React from 'react';
import './Footer.css';

// Importa las imágenes desde tu carpeta assets
import parlantesImage from '../assets/parlantes.png';
import audifonosImage from '../assets/audifonos.png';
import botestermosImage from '../assets/botestermos.png';
import cargadoresImage from '../assets/cargadores.png';
import relojesImage from '../assets/relojes.png';
import otrosImage from '../assets/otros.png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import logoImage from '../assets/LogoPng.png';
import metodosPagoImage from '../assets/metodos.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
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
      <div className="footer-content">
        <div className="social-media">
          <p className="social-media-label">Redes Sociales</p>
          <a href="https://facebook.com">
            <img className="social-media-icon" src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://instagram.com">
            <img className="social-media-icon" src={instagramIcon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-links">
          <a href="/acerca" className="footer-link">Acerca de Nosotros</a>
          <a href="/historia" className="footer-link">Nuestra Historia</a>
          <a href="/tiendas" className="footer-link">Tiendas</a>
        </div>
        <div className="logo-container">
          <img className="logo" src={logoImage} alt="Logo de la empresa" />
          <p>&copy; {currentYear} Tu Empresa. Todos los derechos reservados.</p>
        </div>
        <div className="footer-link-with-icon">
          <a href="/servicio-al-cliente" className="footer-link">Servicio al Cliente</a>
          <a href="/quejas" className="footer-link">Quejas y Reclamos</a>
          <a href="/privacidad" className="footer-link">Política de Privacidad</a>
          <img className="icon2" src={metodosPagoImage} alt="Métodos de Pago" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
