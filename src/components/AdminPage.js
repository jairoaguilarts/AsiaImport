import React, { useState } from 'react';
import { Container, Button, Collapse } from 'react-bootstrap';
import './AdminPage.css';
import { Link } from 'react-router-dom';
import menu from '../assets/menu-sidebar.png';
import general from '../assets/pGeneral.png';
import editar from '../assets/pEdit.png';
import empleados from '../assets/pEmpleados.png';
import ventas from '../assets/pVentas.png';
import logOut from '../assets/logout.png';

const AdminPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Container fluid>
        {/* Botón fijo para activar el sidebar */}
        
        <div className='toggle-sidebar' onClick={toggleSidebar}>
            <img src={menu} alt='toggle_sidebar' className='icon-image'/>
        </div>

        {/* Sidebar */}
        <Collapse in={isSidebarOpen}>
            <div className="sidebar">
                <div className="row">
                    <div className="sidebar-top-item" onClick={closeSidebar}>
                        <img src={menu} alt='toggle_sidebar' className='icon-image'/>
                    </div>
                    <hr className='linea-divisora'/>
                    <div className="sidebar-item">
                        <Link to="/adminGeneral">
                            <img src={general} alt='gen' className='icon-image'/>
                            <span>Panel General</span>
                        </Link>
                    </div>
                    <hr className='linea-divisora'/>
                    <div className="sidebar-item">
                        <img src={editar} alt='editar' className='icon-image'/>
                        <span>Editar Página Web</span>
                    </div>
                    <hr className='linea-divisora'/>
                    <div className="sidebar-item">
                    <Link to="/adminempleados">
                        <img src={empleados} alt='emp' className='icon-image'/>
                        <span>Empleados</span>
                        </Link>
                    </div>
                    <hr className='linea-divisora'/>
                    <div className="sidebar-item">
                    <Link to="/ventas">
                        <img src={ventas} alt='ventas' className='icon-image'/>
                        <span>Ventas</span>
                        </Link>
                    </div>
                    <hr className='linea-divisora'/>
                    <div className="sidebar-item">
                        <img src={logOut} alt='ventas' className='icon-image'/>
                        <span>Logout</span>
                    </div>
                    <hr className='linea-divisora'/>
                </div>
            </div>
        </Collapse>
    </Container>
  );
};

export default AdminPage;
