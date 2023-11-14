import './Login.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import userIcon from '../assets/user.png';
import iconoLock from '../assets/lock.png'

function Login() {
  const [show, setShow] = useState(false);
  const [iniciarSesionSeleccionado, setIniciarSesionSeleccionado] = useState(true);
  const [registrarseSeleccionado, setRegistrarseSeleccionado] = useState(false);
  const [showVentanaForgot, setShowVentanaForgot] = useState(false);

  const handleIniciarSesionClick = () => {
    setIniciarSesionSeleccionado(true);
    setRegistrarseSeleccionado(false);
  };
  
  const handleRegistrarseClick = () => {
    setIniciarSesionSeleccionado(false);
    setRegistrarseSeleccionado(true);
  };
  const handleClose = () => {
    setShow(false);
    setShowVentanaForgot(false);
  }
  const handleShow = () => setShow(true);

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
        <p>Iniciar Sesion</p>
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

      <Modal show={show} onHide={handleClose} size="lg"  centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="button-container">
                <button  onClick={handleIniciarSesionClick}  className={`iniciar-sesion ${iniciarSesionSeleccionado ? 'selected' : ''}`}>
                <p>Iniciar Sesion</p>
                </button>
                <button onClick={handleRegistrarseClick} className={`registrarse ${registrarseSeleccionado ? 'selected' : ''}`}>
                <p>Registrarse</p>
                </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="forms" controlId="exampleForm.ControlInput1">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="forms" controlId="exampleForm.ControlInput1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                autoFocus
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center ">
            <button className="forgot" onClick={handleForgotShow}>
                ¿Olvidaste tu Contraseña?
            </button>
          </div>
        <div className="d-flex justify-content-center ">
            <Button className="login" variant="primary" size="lg" onClick={handleClose}>
                INICIAR SESION
            </Button>
        </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Login;