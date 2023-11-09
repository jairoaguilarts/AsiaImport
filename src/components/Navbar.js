import React, { useState } from 'react';
import './Navbar.css';
import logoImage from '../assets/LogoPng.png'; // Asegúrate de que la ruta al logo es correcta
import userIcon from '../assets/user.png'; // Asegúrate de que la ruta al icono es correcta
import cartIcon from '../assets/add-to-cart.png'; // Asegúrate de que la ruta al icono es correcta
import searchIcon from '../assets/lupa.png'; // Asegúrate de que la ruta al icono es correcta

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Estado para controlar la visibilidad de la barra de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };

  const toggleSearch = () => { // Función para alternar la visibilidad de la barra de búsqueda
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementa la lógica de búsqueda aquí, como enviar el término de búsqueda a una API o filtrar datos
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={`navbar ${searchOpen ? 'search-active' : ''}`}>
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logoImage} alt="Logo" />
        <span className="brand-name"></span>
      </div>

      {/* Contenedor del ícono de la lupa, que será visible solo en pantallas pequeñas */}
      <div className="icon-lupa-container">
        <button className="icon-button" onClick={toggleSearch}>
          <img src={searchIcon} alt="Buscar" className="icon" />
        </button>
      </div>

      {/* Contenedor de la barra de búsqueda */}
      <form className={`search-container ${searchOpen ? 'search-open' : ''}`} onSubmit={handleSearch}>
        <input
          type="text"
          className="search-box"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="Buscar" />
        </button>
      </form>

      <ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
        <li><a href="#inicio" className="menu-item"></a></li>
        <li><a href="#informacion" className="menu-item"></a></li>
        <li><a href="#comprar" className="menu-item"></a></li>
      </ul>

      {/* Contenedor para los íconos de usuario y carrito */}
      <div className="icon-container">
        <button className="icon-button" onClick={() => console.log('User icon clicked')}>
          <img src={userIcon} alt="User" className="icon" />
        </button>
        <button className="icon-button" onClick={() => console.log('Cart icon clicked')}>
          <img src={cartIcon} alt="Cart" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
