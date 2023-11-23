import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import userIcon from "../assets/user.png";
import iconoLock from "../assets/lock.png";
import ConfirmacionCorreo from "./ConfirmacionCorreo";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import "./EditarPerfil.js";

function Login() {
  const [show, setShow] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [showVentanaForgot, setShowVentanaForgot] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para ConfirmacionCorreo
  const [emailRecovery, setEmailRecovery] = useState("");
  const [nombre, setNombre] = useState("");
  const logueado = localStorage.getItem("logueado");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem("logueado"));
  const [menuOpen, setMenuOpen] = useState(false);



  const login = window.localStorage.getItem("logueado");
  const firebaseUID = localStorage.getItem("FireBaseUID");

  const navigate = useNavigate();
  const [formDataRegistro, setFormDataRegistro] = useState({
    nombre: "",
    apellido: "",
    numeroIdentidad: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });

  const [formDataLogIn, setFormDataLogIn] = useState({
    correo: "",
    contrasenia: "",
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEditProfile = () => {
    navigate("/editar");
  };
  

  const handleClose = () => {
    setShow(false);
    setShowVentanaForgot(false);
  };

  const handleShow = () => {

    if (login) {
      navigate("/editar");
    } else {
      setShow(true);
    }
  };

  const handleForgotShow = () => {
    setShowVentanaForgot(true);
    setShow(false);
  };

  const handleForgotClose = () => {
    setShowVentanaForgot(false);
    setShow(true);
  };

  const handleIniciarSesionClick = () => {
    setIsLoginSelected(true);
  };

  const handleRegistrarseClick = () => {
    setIsLoginSelected(false);
  };

  const handleChangeRegistro = (e) => {
    setFormDataRegistro({ ...formDataRegistro, [e.target.id]: e.target.value });
  };

  const handleChangeLogIn = (e) => {
    setFormDataLogIn({ ...formDataLogIn, [e.target.id]: e.target.value });
  };



  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    if (
      !formDataRegistro.formBasicNombre.trim() ||
      !formDataRegistro.formBasicApellido.trim() ||
      !formDataRegistro.formBasicID.trim() ||
      !formDataRegistro.formBasicEmailRegistro.trim() ||
      !formDataRegistro.formBasicPasswordRegistro.trim() ||
      !formDataRegistro.formBasicConfirmPassword.trim()
    ) {
      alert("Todos los campos son necesarios");
      return;
    }
  
    if (!/^[a-zA-Z ]+$/.test(formDataRegistro.formBasicNombre) || !/^[a-zA-Z ]+$/.test(formDataRegistro.formBasicApellido)) {
      alert("El nombre y apellido solo deben contener letras");
      return;
    }
  
    if (!/^\d+$/.test(formDataRegistro.formBasicID)) {
      alert("El ID solo debe contener números y no debe contener espacios");
      return;
    }
  
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formDataRegistro.formBasicEmailRegistro)) {
      alert("Formato de correo electrónico no válido");
      return;
    }
  
    if (formDataRegistro.formBasicPasswordRegistro.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
  
    if (formDataRegistro.formBasicPasswordRegistro !== formDataRegistro.formBasicConfirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  

    const datosRegistro = {
      correo: formDataRegistro.formBasicEmailRegistro,
      contrasenia: formDataRegistro.formBasicPasswordRegistro,
      nombre: formDataRegistro.formBasicNombre,
      apellido: formDataRegistro.formBasicApellido,
      numeroIdentidad: formDataRegistro.formBasicID,
    };

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosRegistro),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      handleClose();
      setShowConfirmation(true); // Mostrar la ventana de confirmación
      handleClose();
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro: " + error.message);
    }
  };

  const handleLogIn = async () => {
    if (
      !formDataLogIn.formBasicEmail.trim() ||
      !formDataLogIn.formBasicPassword.trim()
    ) {
      alert("Los campos no estan completos");
      return;
    }

    const datosLogIn = {
      correo: formDataLogIn.formBasicEmail,
      contrasenia: formDataLogIn.formBasicPassword,
    };

    try {
      const response = await fetch("https://importasia-api.onrender.com/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosLogIn),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (
          response.status === 401 &&
          errorData.error === "Correo electrónico no verificado"
        ) {
          setShowConfirmation(true);
        } else {
          throw new Error(`Error: ${errorData.message || response.status}`);
        }
        return;
      }

      const userData = await response.json();

      const FUID = userData.usuario.firebaseUID;
      const UserType = userData.usuario.userType;

      if(UserType === "*") {
        setIsAdmin(true);
        window.location.reload();
      }
      console.log("Click");

      localStorage.setItem("FireBaseUID", FUID);
      localStorage.setItem("UserType", isAdmin);
      


      setUserData(userData);
      navigate("/inicio");
      setNombre(userData.usuario.nombre);
      handleClose();
      window.localStorage.setItem("logueado",true);
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro: " + error.message);
    }
  };

  const handlePasswordRecovery = async () => {
    if (!emailRecovery.trim()) {
      alert("Por favor, ingresa un correo electrónico");
      return;
    }

    try {
      const response = await fetch("https://importasia-api.onrender.com/recoverPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: emailRecovery }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        } else {
          const errorText = await response.text();
          alert(`Error: ${errorText}`);
        }
        return;
      }

      alert("Se ha enviado un correo de recuperación a tu email");
      setEmailRecovery("");
      handleForgotClose();
    } catch (error) {
      alert(
        "Error en la recuperación de contraseña. Por favor, verifica tu conexión a internet y intenta de nuevo."
      );
    }
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
        localStorage.removeItem("UserType");
        setMenuOpen(false); 
        navigate("/inicio");
        window.location.reload();
      }
    }
  };



  const handleSubmit = () => {
    if (isLoginSelected) {
      handleLogIn();
    } else {
      handleRegister();
    }
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
      setNombre(userData.nombre);
    } catch (error) { }
  };


  return (
    <>
      {!logueado ? (
      <button onClick={handleShow} className="icon-button">
        <img src={userIcon} alt="User" className="icon" />
        <p>Iniciar Sesión</p>
      </button>
    ) : (
      <div className="user-menu">
        <button onClick={toggleMenu} className="icon-button" onLoad={handleGetInfo}>
          <img src={userIcon} alt="User" className="icon" />
          <p>Hola, {nombre}</p>
        </button>
        <div className={menuOpen ? 'menu-options menu-open' : 'menu-options'}>
          <button onClick={handleEditProfile}>Editar perfil</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    )}

      {showVentanaForgot && (
        // Ventana de Recuperacion de Contraseña
        <Modal
          show={showVentanaForgot}
          onHide={handleForgotClose}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="forgot_container">
                <img src={iconoLock} alt="icono_lock" className="forgot_icon" />
                <h1 className="forgot_titulo">Recuperar Contraseña</h1>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="body_text">
              Ingresa los datos solicitados para generar una nueva contraseña
            </p>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" autoFocus />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-center ">
              <Button
                className="recuperar"
                variant="primary"
                size="md"
                onClick={handleClose}
              >
                RECUPERAR
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header className="inicio-registro" closeButton>
          <Modal.Title>
            <div className="button-container">
              <button
                onClick={handleIniciarSesionClick}
                className={`iniciar-sesion ${isLoginSelected ? "selected" : ""
                  }`}
              >
                <p>Iniciar Sesión</p>
              </button>
              <button
                onClick={handleRegistrarseClick}
                className={`registrarse ${!isLoginSelected ? "selected" : ""}`}
              >
                <p>Registrarse</p>
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {isLoginSelected ? (
              <>
                <Form.Group className="forms" controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico"
                    autoFocus
                    onChange={handleChangeLogIn}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChangeLogIn}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button className="forgot" onClick={handleForgotShow}>
                    ¿Olvidaste tu Contraseña?
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Form.Group className="forms" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ID"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicEmailRegistro"
                >
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicPasswordRegistro"
                >
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirmar Contraseña"
                    onChange={handleChangeRegistro}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="footer-cont">
          <Button className="login" variant="primary" onClick={handleSubmit}>
            {isLoginSelected ? "INICIAR SESIÓN" : "REGISTRARSE"}
          </Button>
        </Modal.Footer>
      </Modal>

      {showConfirmation && (
        <ConfirmacionCorreo onClose={() => setShowConfirmation(false)} />
      )}

      {showVentanaForgot && ( //recuperar contraseña diseño
        <Modal
          show={showVentanaForgot}
          onHide={handleForgotClose}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="forgot_container">
                <img src={iconoLock} alt="icono_lock" className="forgot_icon" />
                <h1
                  className="forgot_titulo"
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "visible",
                    textOverflow: "clip",
                    maxWidth: "100%",
                  }}
                >
                  Recuperar Contraseña
                </h1>{" "}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="body_text">
              Ingresa tu correo electrónico para recuperar tu contraseña.
            </p>
            <Form>
              <Form.Group controlId="formBasicEmailRecovery">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={emailRecovery}
                  onChange={(e) => setEmailRecovery(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-center">
              <Button
                className="recuperar"
                variant="primary"
                size="md"
                onClick={handlePasswordRecovery}
              >
                RECUPERAR
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Login;
