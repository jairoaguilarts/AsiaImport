import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import userIcon from "../../assets/user.png";
import iconoLock from "../../assets/lock.png";
import ConfirmacionCorreo from "../Informative_screens/ConfirmacionCorreo.js";
import CustomAlert from "../Informative_screens/CustomAlert.js";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import "../Client_screens/EditarPerfil.js";

function Login() {
  const [show, setShow] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [showVentanaForgot, setShowVentanaForgot] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [emailRecovery, setEmailRecovery] = useState("");
  const [nombre, setNombre] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("logueado")
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const logueado = localStorage.getItem("logueado");
  const firebaseUID = localStorage.getItem("FireBaseUID");

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const navigate = useNavigate();

  const [formDataRegistro, setFormDataRegistro] = useState({
    formBasicNombre: "",
    formBasicApellido: "",
    formBasicID: "",
    formBasicEmailRegistro: "",
    formBasicPasswordRegistro: "",
    formBasicConfirmPassword: "",
  });

  const [formDataLogIn, setFormDataLogIn] = useState({
    formBasicEmail: "",
    formBasicPassword: "",
  });

  useEffect(() => {
    if (isLoginSelected) {
      setFormDataLogIn({
        formBasicEmail: "",
        formBasicPassword: "",
      });
    } else {
      setFormDataRegistro({
        formBasicNombre: "",
        formBasicApellido: "",
        formBasicID: "",
        formBasicEmailRegistro: "",
        formBasicPasswordRegistro: "",
        formBasicConfirmPassword: "",
      });
    }
  }, [isLoginSelected]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEditProfile = () => {
    navigate("/editar");
  };

  const handleClose = () => {
    setShow(false);
    setShowVentanaForgot(false);
    setFormDataLogIn({
      formBasicEmail: "",
      formBasicPassword: "",
    });
  };

  const handleShow = () => {
    if (logueado) {
      navigate("/editar");
    } else {
      setIsLoginSelected(true);
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
    mostrarAlerta("Asegurate de completar todos los datos", "info");
  };

  const handleRegistrarseClick = () => {
    setIsLoginSelected(false);
    mostrarAlerta("Asegurate de completar todos los datos", "info");
  };

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setFormDataRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLogIn = (e) => {
    const { name, value } = e.target;
    setFormDataLogIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      mostrarAlerta("Todos los campos son necesarios", "danger");
      return false;
    } else if (!/^[a-zA-Z ]+$/.test(formDataRegistro.formBasicNombre)) {
      mostrarAlerta("El nombre solo debe contener letras", "danger");
      return;
    } else if (!/^[a-zA-Z ]+$/.test(formDataRegistro.formBasicApellido)) {
      mostrarAlerta("El apellido solo debe contener letras", "danger");
      return;
    } else if (!/^\d+$/.test(formDataRegistro.formBasicID)) {
      mostrarAlerta("El ID es incorrecto", "danger");
      return;
    } else if (document.getElementById("formBasicID").value.length < 13) {
      mostrarAlerta("Ingrese un ID valido", "danger");
      return;
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        formDataRegistro.formBasicEmailRegistro
      )
    ) {
      mostrarAlerta("Formato de correo electrónico no válido", "danger");
      return;
    } else if (formDataRegistro.formBasicPasswordRegistro.length < 6) {
      mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "danger");
      return;
    } else if (
      formDataRegistro.formBasicPasswordRegistro !==
      formDataRegistro.formBasicConfirmPassword
    ) {
      mostrarAlerta("Las contraseñas no coinciden", "danger");
      return;
    }

    const datosRegistro = {
      correo: formDataRegistro.formBasicEmailRegistro,
      contrasenia: formDataRegistro.formBasicPasswordRegistro,
      nombre: formDataRegistro.formBasicNombre,
      apellido: formDataRegistro.formBasicApellido,
      numeroIdentidad: formDataRegistro.formBasicID,
    };

    let errorMessage = "";

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
        switch (response.status) {
          case 400:
            errorMessage = "Usuario con correo ya registrado."
            break;
          case 401:
            errorMessage = "Usuario con ID ya registrado."
            break;
          default:
            errorMessage = "Error desconocido";
            break;
        }
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      handleClose();
      setShowConfirmation(true);
      handleClose();
    } catch (error) {
      mostrarAlerta(errorMessage, "danger");
    }
  };

  const handleLogIn = async () => {
    if (
      !formDataLogIn.formBasicEmail.trim() ||
      !formDataLogIn.formBasicPassword.trim()
    ) {
      mostrarAlerta("Los campos no estan completos", "danger");
      return;
    }

    const datosLogIn = {
      correo: formDataLogIn.formBasicEmail,
      contrasenia: formDataLogIn.formBasicPassword,
    };

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/logIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosLogIn),
        }
      );

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
      localStorage.setItem("userType", UserType);

      if (UserType === "*") {
        localStorage.setItem("IsAdmin", true);
        navigate("/adminGeneral");
        window.location.reload();
      } else {
        localStorage.setItem("IsAdmin", false);
      }

      setUserData(userData);
      navigate("/inicio");
      setNombre(userData.usuario.nombre);
      handleClose();

      window.localStorage.setItem("logueado", true);
      localStorage.setItem("FireBaseUID", FUID);
    } catch (error) {
      mostrarAlerta("Correo o contraseña incorrecto ", "danger");
    }
  };

  const handlePasswordRecovery = async () => {
    if (!emailRecovery.trim()) {
      mostrarAlerta("Por favor, ingresa un correo electrónico", "danger");
      return;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailRecovery)) {
      mostrarAlerta("Formato de correo electrónico no válido", "danger");
      return;
    }

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/recoverPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: emailRecovery }),
        }
      );

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

      mostrarAlerta(
        "Se ha enviado un correo de recuperación a tu email",
        "info"
      );
      setEmailRecovery("");
    } catch (error) {
      mostrarAlerta(
        "Error en la recuperación de contraseña. Por favor, verifica tu conexión a internet y intenta de nuevo.",
        "danger"
      );
    }
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
        localStorage.removeItem("FireBaseUID");
        setMenuOpen(false);
        navigate("/inicio");
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
          <button
            onClick={toggleMenu}
            className="icon-button"
            onLoad={handleGetInfo}
          >
            <img src={userIcon} alt="User" className="icon" />
            <p>Hola, {nombre}</p>
          </button>
          <div className={menuOpen ? "menu-options menu-open" : "menu-options"}>
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
                    name="formBasicEmail"
                    placeholder="Correo Electrónico"
                    autoFocus
                    onChange={handleChangeLogIn}
                    value={formDataLogIn.formBasicEmail}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="formBasicPassword"
                    placeholder="Contraseña"
                    onChange={handleChangeLogIn}
                    value={formDataLogIn.formBasicPassword}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button className="forgot" onClick={handleForgotShow}>
                    ¿Olvidaste tu Contraseña?
                  </Button>
                </div>
                {showAlert && (
                  <CustomAlert
                    className="alerta"
                    message={alertMessage}
                    variant={alertVariant}
                    onClose={() => setShowAlert(false)}
                  />
                )}
              </>
            ) : (
              <>
                <Form.Group className="forms" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="formBasicNombre"
                    placeholder="Nombre"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicNombre}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="formBasicApellido"
                    placeholder="Apellido"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicApellido}
                  />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="formBasicID"
                    placeholder="ID"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicID}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicEmailRegistro"
                >
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="formBasicEmailRegistro"
                    placeholder="Correo Electrónico"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicEmailRegistro}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicPasswordRegistro"
                >
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="formBasicPasswordRegistro"
                    placeholder="Contraseña"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicPasswordRegistro}
                  />
                </Form.Group>
                <Form.Group
                  className="forms"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="formBasicConfirmPassword"
                    placeholder="Confirmar Contraseña"
                    onChange={handleChangeRegistro}
                    value={formDataRegistro.formBasicConfirmPassword}
                  />
                </Form.Group>
                {showAlert && (
                  <CustomAlert
                    className="alerta"
                    message={alertMessage}
                    variant={alertVariant}
                    onClose={() => setShowAlert(false)}
                  />
                )}
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
            {showAlert && (
              <CustomAlert
                className="alerta"
                message={alertMessage}
                variant={alertVariant}
                onClose={() => setShowAlert(false)}
              />
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Login;
