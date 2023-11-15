import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; // Asegúrate de tener axios instalado
import userIcon from '../assets/user.png';
import iconoLock from '../assets/lock.png';
import './Login.css';

function Login() {
  const [show, setShow] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [showVentanaForgot, setShowVentanaForgot] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numeroIdentidad: '',
    correo: '',
    contrasenia: '',
    confirmarContrasenia: ''
  });

  const handleClose = () => {
    setShow(false);
    setShowVentanaForgot(false);
  }

  const handleShow = () => setShow(true);

  const handleIniciarSesionClick = () => {
    setIsLoginSelected(true);
  };

  const handleRegistrarseClick = () => {
    setIsLoginSelected(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    const datosRegistro = {
      correo: formData.correo,
      contrasenia: formData.contrasenia,
      nombre: formData.nombre,
      apellido: formData.apellido,
      numeroIdentidad: formData.numeroIdentidad
    };
  
    try {
      const response = await fetch('http://localhost:3000/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosRegistro)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Registro exitoso:', data);
      handleClose();
    } catch (error) {
      console.error('Error en el registro:', error.message);
    }
  };
  

  const handleSubmit = () => {
    if (isLoginSelected) {
    } else {
      handleRegister();
    }
  };

  const handleForgotShow = () => {
    setShowVentanaForgot(true);
    setShow(false);
  }

  const handleForgotClose = () => {
    setShowVentanaForgot(false);
    setShow(true);
  }

  return (
    <>
      <button onClick={handleShow} className="icon-button" >
        <img src={userIcon} alt="User" className="icon" />
        <p>Iniciar Sesión</p>
      </button>

      {showVentanaForgot && (
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
                <Form.Group className="forms" controlId="correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="Correo Electrónico" autoFocus onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="contrasenia">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" autoFocus onChange={handleChange} />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group className="forms" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Apellido" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="numeroIdentidad">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="text" placeholder="ID" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="correo">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Correo Electrónico" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="contrasenia">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="forms" controlId="confirmarContrasenia">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Confirmar Contraseña" onChange={handleChange} />
                </Form.Group>
              </>
            )}
          </Form>
          <div className={`d-flex justify-content-center ${isLoginSelected ? '' : 'hidden'}`}>
            <button className="forgot" onClick={handleForgotShow}>
              ¿Olvidaste tu Contraseña?
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="login" variant="primary" size="lg" onClick={handleSubmit}>
              {isLoginSelected ? 'INICIAR SESIÓN' : 'REGISTRARSE'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
