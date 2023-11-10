// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Importa las imágenes desde tu carpeta assets
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import logoImage from '../assets/LogoPng.png';
import metodosPagoImage from '../assets/metodos.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
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
        <Link to="/acerca" className="footer-link">Acerca de Nosotros</Link>
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
