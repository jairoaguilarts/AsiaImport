import React, { useState, useEffect } from "react";
import { Container, Collapse } from "react-bootstrap";
import "./AdminPage.css";
import { Link } from "react-router-dom";
import menu from "../../assets/menu-sidebar.png";
import general from "../../assets/pGeneral.png";
import editar from "../../assets/pEdit.png";
import empleados from "../../assets/pEmpleados.png";
import ventas from "../../assets/pVentas.png";
import logOut from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const logueado = localStorage.getItem("logueado");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    console.log("FirebaseUID recuperado en OtroComponente:", firebaseUID);
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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
        navigate("/inicio");
        window.location.reload();
      }
    }
  };

  return (
    <Container fluid>
      {/* Botón fijo para activar el sidebar */}

      <div className="toggle-sidebar" onClick={toggleSidebar}>
        <img src={menu} alt="toggle_sidebar" className="icon-image" />
      </div>

      {/* Sidebar */}
      <Collapse in={isSidebarOpen}>
        <div className="sidebar">
          <div className="row">
            <div className="sidebar-top-item" onClick={closeSidebar}>
              <img src={menu} alt="toggle_sidebar" className="icon-image" />
            </div>
            <hr className="linea-divisora" />
            <div className="sidebar-item">
              <Link to="/adminGeneral">
                <img src={general} alt="gen" className="icon-image" />
                <span>Panel General</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div className="sidebar-item">
              < Link to="/gestionpw">
              <img src={editar} alt="editar" className="icon-image" />
              <span>Editar Página Web</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div className="sidebar-item">
              <Link to="/adminempleados">
                <img src={empleados} alt="emp" className="icon-image" />
                <span>Empleados</span>
              </Link>
            </div>
            <hr className="linea-divisora" />
            <div className="sidebar-item">
              <Link to="/ventas">
                <img src={ventas} alt="ventas" className="icon-image" />
                <span>Ventas</span>
              </Link>
            </div>
            <hr className="linea-divisora" />

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
