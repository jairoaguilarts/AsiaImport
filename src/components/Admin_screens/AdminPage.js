import React, { useState, useEffect } from "react";
import { Container, Collapse } from "react-bootstrap";
import "./AdminPage.css";
import { Link } from "react-router-dom";
import menu from "../../assets/menu-sidebar.png";
import general from "../../assets/pGeneral.png";
import editar from "../../assets/pEdit.png";
import empleados from "../../assets/pEmpleados.png";
import iconI from "../../assets/infoI.png";
import ventas from "../../assets/pVentas.png";
import logOut from "../../assets/logout.png";
import icoC from "../../assets/iCarr.png";
import orden from "../../assets/ordenes.png";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const logueado = localStorage.getItem("logueado");
  const navigate = useNavigate();
  const tipoUser = localStorage.getItem("userType");
  console.log("Tipo de Usuario:", tipoUser);

  const toggleSidebar = () => {
    console.log("FirebaseUID recuperado en OtroComponente:", firebaseUID);
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(true);
  };

  const handleLogout = async () => {
    if (logueado) {
      const response = await fetch(
        "https://importasia-api.onrender.com/logOut",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("logueado");
        localStorage.removeItem("IsAdmin");
        localStorage.removeItem("IsEmployee");

        localStorage.removeItem("FireBaseUID");
        localStorage.removeItem("userType");
        navigate("/inicio");
        window.location.reload();
      }
    }
  };
  const isOptionBlocked = (optionName) => {
    const blocked =
      tipoUser === "+" &&
      !(
        optionName === "Gestionar Productos" || optionName === "Gestion Ordenes"
      );
    console.log(`Is ${optionName} blocked?`, blocked);
    return blocked;
  };

  return (
    <Container fluid>
      {/* Botón fijo para activar el sidebar */}

      <div className="toggle-sidebar">
        {/*</div> <div className="toggle-sidebar" onClick={toggleSidebar}>*/}
        <img src={menu} alt="toggle_sidebar" className="icon-image" />
      </div>

      {/* Sidebar */}
      <Collapse in={isSidebarOpen}>
        <div className="sidebar">
          <div className="row">
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Panel General") ? "blocked" : ""
              }`}
            >
              <Link to="/adminGeneral">
                <img src={general} alt="gen" className="icon-image" />
                <span>Panel General</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Gestionar Productos") ? "blocked" : ""
              }`}
            >
              <Link to="/gestionpw">
                <img src={editar} alt="editar" className="icon-image" />
                <span>Gestionar Productos</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Gestionar Informacion") ? "blocked" : ""
              }`}
            >
              <Link to="/GestionarInfo">
                <img src={iconI} alt="emp" className="icon-image" />
                <span>Gestionar Informacion</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Gestionar Carrousel") ? "blocked" : ""
              }`}
            >
              <Link to="/gestion-carrusel">
                <img src={icoC} alt="emp" className="icon-image" />
                <span>Gestionar Carrousel</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Empleados") ? "blocked" : ""
              }`}
            >
              <Link to="/adminempleados">
                <img src={empleados} alt="emp" className="icon-image" />
                <span>Empleados</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Ventas") ? "blocked" : ""
              }`}
            >
              <Link to="/ventas">
                <img src={ventas} alt="ventas" className="icon-image" />
                <span>Ventas</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div
              className={`sidebar-item ${
                isOptionBlocked("Gestion Ordenes") ? "blocked" : ""
              }`}
            >
              <Link to="/gestionordenes">
                <img src={orden} alt="ventas" className="icon-image" />
                <span>Gestion Ordenes</span>
              </Link>
            </div>

            <div className="sidebar-item" onClick={handleLogout}>
              <img src={logOut} alt="logout" className="icon-image" />
              <span>Logout</span>
            </div>

            <hr className="linea-divisora" />
          </div>
        </div>
      </Collapse>
    </Container>
  );
};

export default AdminPage;
