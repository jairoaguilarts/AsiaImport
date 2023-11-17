import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import userIcon from '../assets/user.png';
import iconoLock from '../assets/lock.png'
import './Login.css';

function Login() {
  const [show, setShow] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [showVentanaForgot, setShowVentanaForgot] = useState(false);

  const [formDataRegistro, setFormDataRegistro] = useState({
    nombre: '',
    apellido: '',
    numeroIdentidad: '',
    correo: '',
    contrasenia: '',
    confirmarContrasenia: ''
  });

  const [formDataLogIn, setFormDataLogIn] = useState({
    correo: '',
    contrasenia: ''
  });

  const handleClose = () => {
    setShow(false);
    setShowVentanaForgot(false);
  };

  const handleShow = () => setShow(true);

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
    setFormDataLogIn({...formDataLogIn, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    if (formDataRegistro.formBasicPasswordRegistro !== formDataRegistro.formBasicConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datosRegistro = {
      correo: formDataRegistro.formBasicEmailRegistro,
      contrasenia: formDataRegistro.formBasicPasswordRegistro,
      nombre: formDataRegistro.formBasicNombre,
      apellido: formDataRegistro.formBasicApellido,
      numeroIdentidad: formDataRegistro.formBasicID
    };

    try {
      const response = await fetch('https://importasia-api.onrender.com/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosRegistro)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      handleClose();
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro: ' + error.message);
    }
  };

  const handleLogIn = async () => {
    if(!formDataLogIn.formBasicEmail.trim() || !formDataLogIn.formBasicPassword.trim()) {
      alert('Los campos no estan completos');
      return;
    }

    const datosLogIn = {
      correo: formDataLogIn.formBasicEmail,
      contrasenia: formDataLogIn.formBasicPassword
    };

    try {
      const response = await fetch('https://importasia-api.onrender.com/logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosLogIn)
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      alert('Bienvenido ', data.usuario.nombre);
      handleClose();
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro: ' + error.message);
    }
  };

  const handleSubmit = () => {
    if (isLoginSelected) {
      handleLogIn();
    } else {
      handleRegister();
    }
  };

  return (
    <>
      <button onClick={handleShow} className="icon-button" >
        <img src={userIcon} alt="User" className="icon" />
        <p>Iniciar Sesión</p>
      </button>

      {showVentanaForgot && (
        // Ventana de Recuperacion de Contraseña
        <Modal show={showVentanaForgot} onHide={handleForgotClose} size='md' centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className='forgot_container'>
                <img src={iconoLock} alt='icono_lock' className='forgot_icon'/>
                <h1 className='forgot_titulo'>Recuperar Contraseña</h1>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='body_text'>Ingresa los datos solicitados para generar una nueva contraseña</p>
            <Form>
              <Form.Group controlId='exampleForm.ControlInput1'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  autoFocus
                />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-center ">
              <Button className="recuperar" variant="primary" size="md" onClick={handleClose}>
                RECUPERAR
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="button-container">
              <button onClick={handleIniciarSesionClick} className={`iniciar-sesion ${isLoginSelected ? 'selected' : ''}`}>
                <p>Iniciar Sesión</p>
              </button>
              <button onClick={handleRegistrarseClick} className={`registrarse ${!isLoginSelected ? 'selected' : ''}`}>
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
                  <Form.Control type="email" placeholder="Correo Electrónico" autoFocus onChange={handleChangeLogIn} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" onChange={handleChangeLogIn} />
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
                  <Form.Control type="text" placeholder="Nombre" onChange={handleChangeRegistro} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicApellido" >
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Apellido" onChange={handleChangeRegistro} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" placeholder="ID" onChange={handleChangeRegistro} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicEmailRegistro">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Correo Electrónico" onChange={handleChangeRegistro} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPasswordRegistro">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" onChange={handleChangeRegistro} />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Confirmar Contraseña" onChange={handleChangeRegistro} />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="login" variant="primary" onClick={handleSubmit}>
            {isLoginSelected ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
