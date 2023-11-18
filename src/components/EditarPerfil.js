import React, { useState, useEffect } from "react";
import "./EditarPerfil.css";
import { useUserContext, userContext } from "./UserContext";

import userIcon from "../assets/avatar.png";
import lockIcon from "../assets/locked.png";
import lapizIcon from "../assets/lapiz.png";
import Modal from "./Modal"; // Asegúrate de tener este componente

const EditarPerfil = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { firebaseUID } = useUserContext();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ nombre, apellido, id });
  };
  console.log("Firebase UID from UserContext:", firebaseUID);
  const handleGetInfo = async () => {
    try {
      console.log(firebaseUID);
      const response = await fetch(
        `https://importasia-api.onrender.com/perfil?firebaseUID=${firebaseUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const userData = await response.json();
      console.log("UserData:", userData);

      setNombre(userData.nombre);
      setApellido(userData.apellido);
      setId(userData.numeroIdentidad);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfo();
  }, []);
  const handlePasswordChangeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [userID, setUserID] = useState("");

  const [formDataLogIn, setFormDataLogIn] = useState({
    correo: "",
    contrasenia: "",
  });

  return (
    <div className="perfil-wrapper">
      <div className="icono-usuario">
        <img src={userIcon} alt="Ícono de Usuario" />
      </div>
      <div className="info-usuario">
        <img src={lapizIcon} alt="Editar" className="icono-lapiz" />
        <label className="etiqueta-usuario">{nombre + apellido}</label>
        <label className="etiqueta-usuario">F no funciona</label>
      </div>
      <div className="perfil-container">
        <form className="formulario-perfil" onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="nombre">Nombre*</label>
            <input
              type="text"
              id="Nombre-editar"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label htmlFor="apellido">Apellido*</label>
            <input
              type="text"
              id="Apellido-editar"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="campo-formulario">
            <label htmlFor="id">ID*</label>
            <input
              type="text"
              id="Identidad-editar"
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
