import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navibar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoImage from "../../assets/LogoPng.png";
import cartIcon from "../../assets/add-to-cart.png";
import searchIcon from "../../assets/lupa.png";
import menuIcon from "../../assets/menu.png";
import parlantesImage from "../../assets/parlantes.png";
import audifonosImage from "../../assets/audifonos.png";
import botestermosImage from "../../assets/botestermos.png";
import cargadoresImage from "../../assets/cargadores.png";
import relojesImage from "../../assets/relojes.png";
import otrosImage from "../../assets/otros.png";
import Login from "./Login";
import Carrito from "../Client_screens/Carrito";

const Navibar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const login=window.localStorage.getItem("logueado");
  const [searched, setSearched] = useState(false);
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");
  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };
  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  const [showCategories, setShowCategories] = useState(true);

  const handleSearch = async () => {
   // e.preventDefault();
    // Implementa la lógica de búsqueda aquí, como enviar el término de búsqueda a una API o filtrar datos
    const buscar = {
      Nombre: busqueda.trim(),
    };

    try {
      if (busqueda === "") {
        mostrarAlerta("No se ingresó ningún parametro", "danger");
        return;
      }
      console.log("Busqueda ANTES:" + busqueda);
      const response = await fetch(
        `http://localhost:3000/buscarProducto2?Nombre=${busqueda.trim()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${responseData.message || response.status}`);
      } else {
        mostrarAlerta("Producto encontrado", "success");
        setProducts(responseData);
        setSearched(true);
      }
    } catch (error) {
      mostrarAlerta("Error en la busqueda", "danger");
    }
  };

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
    setBackgroundVisible(!backgroundVisible);
  };

  const handleCloseCarrito = () => {
    setCarritoVisible(false);
    setBackgroundVisible(false);
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
      <div className={`navbar ${searchOpen ? "search-active" : ""}`}>
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
        <div className="search-wrapper">
          <form
            className={`search-container ${searchOpen ? "search-open" : ""}`}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="search-box"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button
            type="submit"
            className={`search-button ${searchOpen ? "search-open" : ""}`}
            onClick={handleSearch}
          >
            <img src={searchIcon} alt="Buscar" />
          </button>
        </div>

        {/* Contenedor para los íconos de usuario y carrito */}
        <div className="icon-container">
          <Login />
          <div className="icon-button" onClick={toggleCarrito}>
            <img src={cartIcon} alt="Cart" className="icon" />
          </div>
          {carritoVisible && (
            <div className="carrito-popup">
              <Carrito onClose={handleCloseCarrito} />
            </div>
          )}
          {backgroundVisible && (
            <div className="background" onClick={handleCloseCarrito} />
          )}
        </div>
      </div>

      {/* I Barra categorias con DropDown de Bootstrap*/}
      <div>
        <Navbar className="barraCategorias" expand="lg">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <button className="btnCategorias" onClick={toggleDropdown}>
                  <NavDropdown
                    className="botonAdicional "
                    id="nav-dropdown-categorias"
                    title={
                      <span style={{ color: "white" }}>
                        <img src={menuIcon} alt="Categ" className="icon" />
                        Categorias
                      </span>
                    }
                  >
                    <NavDropdown.Item href="#accion">
                      Parlantes
                      <img
                        src={parlantesImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#accion">
                      Audífonos
                      <img
                        src={audifonosImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#accion">
                      Botes y Termos
                      <img
                        src={botestermosImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#accion">
                      Cargadores para Móvil
                      <img
                        src={cargadoresImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#accion">
                      Relojes Inteligentes
                      <img
                        src={relojesImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#accion">
                      Otros
                      <img
                        src={otrosImage}
                        height="40px"
                        alt="Parlantes"
                        style={{ border: "7px solid #fff" }}
                      />
                    </NavDropdown.Item>
                  </NavDropdown>
                </button>

                <Navbar.Brand
                  className="botonAdicional"
                  style={{ color: "white", fontSize: 15 }}
                  href="#ProductosDestacados"
                >
                  Productos Destacados
                </Navbar.Brand>
                <Navbar.Brand
                  className="botonAdicional"
                  style={{ color: "white", fontSize: 15 }}
                  href="#ProductosDestacados"
                >
                  Historial De Compras
                </Navbar.Brand>
                <Navbar.Brand
                  className="botonAdicional"
                  style={{ color: "white", fontSize: 15 }}
                  href="#ProductosDestacados"
                ></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Navibar;
