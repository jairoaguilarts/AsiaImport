import React from 'react';

// Estilos CSS
const footerStyles = {
  backgroundColor: '#FDB254',
  color: '#fff',
  padding: '20px 0', // Agregamos espacio superior e inferior
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
};

const socialMediaStyles = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px', // Ajusta el margen izquierdo para separar de la izquierda
};

const socialMediaLabelStyles = {
  textDecoration: 'underline',
  color: '#fff',
  marginBottom: '10px', // Espacio entre el label y los íconos
  marginTop: '-10px', // Ajusta el margen superior para subir el label
};

const socialMediaIconStyles = {
  width: '30px', // Ajusta el tamaño de acuerdo a tus iconos
  margin: '0 10px',
  marginRight: '10px', // Espacio entre los íconos
};

const footerLinksStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const footerLinkStyles = {
  margin: '10px',
  textDecoration: 'underline',
  color: '#fff',
};

const footerLinkWithIconStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginLeft: '10px', // Ajusta el margen izquierdo para separar de la izquierda
};

const iconStyles = {
  width: '30px', // Ajusta el tamaño del icono
};

const copyrightStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Alineación a la izquierda
};

const logoStyles = {
  width: '200px',
  marginBottom: '10px',
  alignItems: 'flex-start', // Alineación a la izquierda
  marginLeft: '-50px', // Ajusta el margen izquierdo
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={socialMediaStyles}>
        <div>
          <p style={socialMediaLabelStyles}>Redes Sociales</p>
          <img
            style={socialMediaIconStyles}
            src={require('../assets/facebook.png')}
            alt="Facebook"
          />
          <img
            style={socialMediaIconStyles}
            src={require('../assets/instagram.png')}
            alt="Instagram"
          />
        </div>
      </div>
      <div style={footerLinksStyles}>
        <a href="#" style={footerLinkStyles}>Acerca de Nosotros</a>
        <a href="#" style={footerLinkStyles}>Nuestra Historia</a>
        <a href="#" style={footerLinkStyles}>Tiendas</a>
      </div>
      <div>
        <img
          style={logoStyles}
          src={require('../assets/LogoPng.png')}
          alt="Logo de la empresa"
        />
        <div style={copyrightStyles}>
          <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
      <div style={footerLinkWithIconStyles}>
        <a href="#" style={footerLinkStyles}>Servicio al Cliente</a>
        <a href="#" style={footerLinkStyles}>Quejas y Reclamos</a>
        <a href="#" style={footerLinkStyles}>Política de Privacidad</a>
        <img
          style={iconStyles}
          src={require('../assets/shopping.png')}
          alt="Métodos de Pago"
        />
      </div>
    </footer>
  );
};

export default Footer;
