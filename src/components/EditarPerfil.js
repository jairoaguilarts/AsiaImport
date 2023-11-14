import React, { useState } from 'react';
import './EditarPerfil.css';

import userIcon from '../assets/avatar.png';
import lockIcon from '../assets/locked.png';
import lapizIcon from '../assets/lapiz.png'; 

const EditarPerfil = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ nombre, apellido, id, password });
  };

  return (
    <div className="perfil-wrapper">
      <div className="icono-usuario">
        <img src={userIcon} alt="Ícono de Usuario" />
      </div>
      <div className="info-usuario">
          <img src={lapizIcon} alt="Editar" className="icono-lapiz" />
          <label className="etiqueta-usuario">Nombre de Usuario</label>
        </div>
      <div className="perfil-container">
        <form className="formulario-perfil" onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="nombre">Nombre*</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="campo-formulario">
            <label htmlFor="apellido">Apellido*</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
          <div className="campo-formulario">
            <label htmlFor="id">ID*</label>
            <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
          </div>
          <div className="campo-formulario cambiar-contrasena-container">
            <img src={lockIcon} alt="Lock Icon" className="lock-icon" />
            <a href="#!" className="cambiar-contrasena">Cambiar Contraseña</a>
          </div>
          <div className="campo-formulario">
            <button type="submit" className="boton-guardar">GUARDAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
