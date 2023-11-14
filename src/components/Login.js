import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import userIcon from '../assets/user.png';
import './Login.css';

function Login() {
  const [show, setShow] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleIniciarSesionClick = () => {
    setIsLoginSelected(true);
  };

  const handleRegistrarseClick = () => {
    setIsLoginSelected(false);
  };

  return (
    <>
      <button onClick={handleShow} className="icon-button" >
        <img src={userIcon} alt="User" className="icon" />
        <p>Iniciar Sesión</p>
      </button>

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
              // Formulario de inicio de sesión
              <>
                <Form.Group className="forms" controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="Correo Electrónico" autoFocus />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" autoFocus />
                </Form.Group>
              </>
            ) : (
              // Formulario de registro con campos adicionales
              <>
                <Form.Group className="forms" controlId="formBasicNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Apellido" />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicID">
                  <Form.Label>ID O RTN</Form.Label>
                  <Form.Control type="text" placeholder="ID o RTN" />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicEmailRegistro">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Correo Electrónico" />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicPasswordRegistro">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <Form.Group className="forms" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Confirmar Contraseña" />
                </Form.Group>
              </>
            )}
          </Form>
          <div className={`d-flex justify-content-center ${isLoginSelected ? '' : 'hidden'}`}>
            <button className="forgot" onClick={handleClose}>
              ¿Olvidaste tu Contraseña?
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="login" variant="primary" size="lg" onClick={handleClose}>
              {isLoginSelected ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
