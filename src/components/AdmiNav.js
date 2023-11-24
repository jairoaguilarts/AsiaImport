import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdmiNav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoImage from "../assets/LogoPng.png";

const AdmiNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const login=window.localStorage.getItem("logueado");
  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(!menuOpen);
    }
  };


 
  const [backgroundVisible, setBackgroundVisible] = useState(false);


  window.addEventListener("scroll", () => {
    if (window.screenY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <div>
      <div className={`admiNav ${searchOpen ? "search-active" : ""}`}>
        {/* Envuelve el logo con un componente Link */}
        <Link to="/adminGeneral" className="admiNav-logo" onClick={handleLogoClick}>
          <img src={logoImage} alt="Logo" />
          <span className="bran-name"></span>
        </Link> 
      </div>
    </div>
  );
};

export default AdmiNav;