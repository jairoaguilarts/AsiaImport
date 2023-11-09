import React from 'react';
import './Footer.css'; // Asegúrate de que el nombre del archivo CSS es correcto

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="social-media">
        <div>
          <p className="social-media-label">Redes Sociales</p>
          <img
            className="social-media-icon"
            src={require('../assets/facebook.png')}
            alt="Facebook"
          />
          <img
            className="social-media-icon"
            src={require('../assets/instagram.png')}
            alt="Instagram"
          />
        </div>
      </div>
      <div className="footer-links">
        <a href="#" className="footer-link">Acerca de Nosotros</a>
        <a href="#" className="footer-link">Nuestra Historia</a>
        <a href="#" className="footer-link">Tiendas</a>
      </div>
      <div className="logo-container">
        <img
          className="logo"
          src={require('../assets/LogoPng.png')}
          alt="Logo de la empresa"
        />
        <p>&copy; {currentYear} Tu Empresa. Todos los derechos reservados.</p>
      </div>
      <div className="footer-link-with-icon">
        <a href="#" className="footer-link">Servicio al Cliente</a>
        <a href="#" className="footer-link">Quejas y Reclamos</a>
        <a href="#" className="footer-link">Política de Privacidad</a>
        <img
          className="icon2"
          src={require('../assets/metodos.png')}
          alt="Métodos de Pago"
        />
      </div>
    </footer>
  );
};

export default Footer;
