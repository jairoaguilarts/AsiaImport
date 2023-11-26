import React, { useState, useEffect } from "react";
import "./EditarPerfil.css";
import userIcon from "../../assets/avatar.png";
import lapizIcon from "../../assets/lapiz.png";
import CustomAlert from '../Informative_screens/CustomAlert';
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const EditarPerfil = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [id, setId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(true);
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const logueado = localStorage.getItem("logueado");

  const [datosViejos, setdatosViejos] = useState("");
  const [error, setError] = useState("");

  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');

  const navigate = useNavigate();

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    // Ocultar la alerta después de 5 segundos (5000 milisegundos)
    setTimeout(() => {
      setShowAlert(false);
    }, 1500); // Cambia este valor según el tiempo que quieras que la alerta esté visible
  };

  const validarDatos = () => {
    const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    const regexId = /^\d+$/;

    if (!regexNombreApellido.test(nombre) || !regexNombreApellido.test(apellido)) {   
    mostrarAlerta('Datos incorrectos en nombre o apellido. Solo se permiten letras.','danger');

      return false;
    }

    if (!regexId.test(id)) {
      mostrarAlerta('Datos incorrectos en ID. Solo se permiten números.','danger');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (!validarDatos()) {
      return;
    }

    // Validar si no se ha realizado ningún cambio
    if (nombre === datosViejos.nombre && apellido === datosViejos.apellido && id === datosViejos.numeroIdentidad) {
      mostrarAlerta('"No se han realizado cambios para guardar"','danger');
    
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
    mostrarAlerta('Cambios Realizados','success');
  
  };

  const handleGetInfo = async () => {
    try {
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
      setdatosViejos(userData);
      setNombre(userData.nombre);
      setApellido(userData.apellido);
      setId(userData.numeroIdentidad);

    } catch (error) { }
  };

  const handleLogout = async () => {
    if (logueado) {
      const response = await fetch("https://importasia-api.onrender.com/logOut", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("logueado");
        navigate("/inicio");
      }
    }
  }

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

        <label className="etiqueta-usuario">
          <img src={lapizIcon} alt="Editar" className="icono-lapiz" />
          {nombre + " " + apellido}
        </label>
        <button
          className="boton-out"
          onClick={handleLogout}
        >
          Logout
        </button>
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
            // onClick={handleSubmit}
            >
              GUARDAR
            </button>
            {showAlert && (
        <CustomAlert
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}
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