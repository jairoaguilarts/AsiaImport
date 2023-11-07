import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null); // Definir el estado para el elemento apuntado por el mouse

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const topBarStyle = {
    backgroundColor: '#4179CC',
    height: '20px',
    width: '100%',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space between',
    alignItems: 'center',
    background: 'white',
    padding: '10px',
    position: 'relative',
    color: '#4179cc',
    top: '4px',
  };

  const lineStyle = {
    height: '2px',
    width: '100%',
    backgroundColor: '#F38413',
    position: 'absolute',
    bottom: 0,
  };

  const menuStyle = {
    listStyle: 'none',
    display: isSmallScreen ? (menuOpen ? 'block' : 'none') : 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: isSmallScreen ? '100%' : 20,
    left: isSmallScreen ? 0 : '40px',
    backgroundColor: 'white',
    width: '100%',
  };

  const menuItemStyle = {
    margin: '0 10px',
    textDecoration: hoveredMenuItem === 'Contáctenos' && !isSmallScreen ? 'underline' : 'none', // Subraya solo "Contáctenos" en pantalla grande
    transition: 'text-decoration 0.3s', // Agrega transición para el subrayado
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#4179cc',
  };

  const hamburgerStyle = {
    cursor: 'pointer',
    fontSize: '30px',
    color: '#F38413',
  };

  return (
    <div>
      <div style={topBarStyle}></div>
      <nav style={navbarStyle}>
        <div style={lineStyle}></div>
        <div onClick={toggleMenu} style={{ ...hamburgerStyle, marginRight: '1px', color: '#F38413' }}>
          ☰
        </div>
        <ul style={menuStyle}>
          <li
            style={{
              ...menuItemStyle,
              textDecoration: hoveredMenuItem === 'Inicio' && !isSmallScreen ? 'underline' : 'none', //
              backgroundColor: menuOpen && hoveredMenuItem === 'Inicio' ? '#F38413' : 'transparent',
            }}
            onMouseEnter={() => setHoveredMenuItem('Inicio')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            <a href="#" style={linkStyle}>Inicio</a>
          </li>
          <li
            style={{
              ...menuItemStyle,
              textDecoration: hoveredMenuItem === 'Información General' && !isSmallScreen ? 'underline' : 'none', 
              backgroundColor: menuOpen && hoveredMenuItem === 'Información General' ? '#F38413' : 'transparent',
            }}
            onMouseEnter={() => setHoveredMenuItem('Información General')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            <a href="#" style={linkStyle}>Información General</a>
          </li>
          <li
            style={{
              ...menuItemStyle,
              textDecoration: hoveredMenuItem === 'Registrarse' && !isSmallScreen ? 'underline' : 'none', 
              backgroundColor: menuOpen && hoveredMenuItem === 'Registrarse' ? '#F38413' : 'transparent',
            }}
            onMouseEnter={() => setHoveredMenuItem('Registrarse')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            <a href="#" style={linkStyle}>Registrarse</a>
          </li>
          <li
            style={{
              ...menuItemStyle,
              textDecoration: hoveredMenuItem === 'Contáctenos' && !isSmallScreen ? 'underline' : 'none', 
              backgroundColor: menuOpen && hoveredMenuItem === 'Contáctenos' ? '#F38413' : 'transparent',
            }}
            onMouseEnter={() => setHoveredMenuItem('Contáctenos')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            <a href="#" style={linkStyle}>Contáctenos</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
