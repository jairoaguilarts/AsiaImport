import React, { useState } from "react";
import "./EditarPerfil.css";
import { userData } from "./Login";
import userIcon from "../assets/avatar.png";
import lockIcon from "../assets/locked.png";
import lapizIcon from "../assets/lapiz.png";
import Modal from "./Modal"; // Asegúrate de tener este componente

const EditarPerfil = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ nombre, apellido, id });
  };

  const handlePasswordChangeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="perfil-wrapper">
      <div className="icono-usuario">
        <img src={userIcon} alt="Ícono de Usuario" />
      </div>
      <div className="info-usuario">
        <img src={lapizIcon} alt="Editar" className="icono-lapiz" />
        <label className="etiqueta-usuario">
          userData.usuario.nombre + " "+ userData.usuario.apellido
        </label>
      </div>
      <div className="perfil-container">
        <form className="formulario-perfil" onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="nombre">Nombre*</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label htmlFor="apellido">Apellido*</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label htmlFor="id">ID*</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="cambiar-contrasena-container">
            <a
              href="#!"
              className="cambiar-contrasena"
              onClick={handlePasswordChangeClick}
            >
              Cambiar Contraseña
            </a>
          </div>
          <div className="campo-formulario">
            <button type="submit" className="boton-guardar">
              GUARDAR
            </button>
          </div>
        </form>
      </div>
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default EditarPerfil;
