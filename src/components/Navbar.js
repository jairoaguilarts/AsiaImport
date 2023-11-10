import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from '../assets/LogoPng.png'; 
import favoritesIcon from '../assets/favoritos.png';
import userIcon from '../assets/user.png'; 
import cartIcon from '../assets/add-to-cart.png'; 
import searchIcon from '../assets/lupa.png'; 
import menuIcon from '../assets/menu.png';
import downIcon from '../assets/down.png';
import DropDown from './DropDown';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [active, setActive] = useState(false);
  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };

  const toggleSearch = () => { 
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementa la lógica de búsqueda aquí, como enviar el término de búsqueda a una API o filtrar datos
    console.log('Searching for:', searchTerm);
  };

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };


  window.addEventListener("scroll", () => {
    if (window.screenY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <div>

      <div className={`navbar ${searchOpen ? 'search-active' : ''}`}>
        {/* Envuelve el logo con un componente Link */}
        <Link to="/inicio" className="navbar-logo" onClick={handleLogoClick}>
          <img src={logoImage} alt="Logo" />
          <span className="brand-name"></span>
        </Link>


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

        {/*<ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
        <li><a href="#inicio" className="menu-item"></a></li>
        <li><a href="#informacion" className="menu-item"></a></li>
        <li><a href="#comprar" className="menu-item"></a></li>
      </ul>*/}

        {/* Contenedor para los íconos de usuario y carrito */}
        <div className="icon-container">
        <button className="icon-button" onClick={() => console.log('Favorites icon clicked')}>
            <img src={favoritesIcon} alt="Favs" className="icon" />
          </button>
          <button className="icon-button" onClick={() => console.log('User icon clicked')}>
            <img src={userIcon} alt="User" className="icon" />
            <p>Iniciar Sesion</p>
          </button>
          <button className="icon-button" onClick={() => console.log('Cart icon clicked')}>
            <img src={cartIcon} alt="Cart" className="icon" />
          </button>
        </div>
      </div>
      {/* Seccion para las Categorias */}
      <div className="barraCategorias">
        <div className='categorias'>
          <button className="btnCategorias" onClick={toggleDropdown}>
            <img src={menuIcon} alt='Categ' className='icon' />
            <span className="textoCategorias">Categorías</span>
            <img src={downIcon} alt='Categ' style={{ padding: '3px', width: '20px', height: '20px' }} />
          </button>
          {dropdown && <DropDown />}
        </div>
        <div className="botonesAdicionales">
          <a href="/productos-destacados" className="botonAdicional">Productos Destacados</a>
          <a href="/historial-de-compras" className="botonAdicional">Historial de Compras</a>
          <a href="/lista-de-deseos" className="botonAdicional">Lista de Deseos</a>
        </div>
      </div>

    </div>

  );
};

export default Navbar;
