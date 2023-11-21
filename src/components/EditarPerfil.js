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
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [datosViejos, setdatosViejos] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    if (!nombre || !apellido || !id) {
      alert("Todos los campos son obligatorios");
      return;
    }
    // Validar si no se ha realizado ningún cambio
    if (nombre ===datosViejos.nombre && apellido === datosViejos.apellido && id === datosViejos.numeroIdentidad) {
      alert("No se han realizado cambios para guardar");
      return;
    }
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/perfil?firebaseUID=${firebaseUID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre, // Asegúrate de tener estas variables definidas en tu estado
            apellido: apellido,
            identidad: id,
          }),
        }    
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const userData = await response.json();
      console.log("Datos actualizados del usuario:", userData);
      
      // Puedes realizar otras acciones después de la actualización, si es necesario.
    } catch (error) {
      console.error("Error al actualizar información del usuario:", error);
      // Puedes manejar el error de acuerdo a tus necesidades.
    }
    alert("Cambios Realizados");
  };

  const handleGetInfo = async () => {
    try {
      console.log("Prueba antes de Response:", firebaseUID);

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
      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const userData = await response.json();
      console.log("UserData:", userData);
      setdatosViejos(userData);
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
        <label className="etiqueta-usuario">{nombre + " " + apellido}</label>
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
            <button
              type="submit"
              className="boton-guardar"
            //  onClick={handleSubmit}
            >
              GUARDAR
            </button>
          </div>
          {error && <div className="error-message">{error}</div>} 
        </form>
        {showModal && <Modal onClose={handleCloseModal} />}

      </div>
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default EditarPerfil;