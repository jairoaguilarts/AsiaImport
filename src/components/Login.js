import './Login.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import userIcon from '../assets/user.png';

function Login() {
  const [show, setShow] = useState(false);
  const [iniciarSesionSeleccionado, setIniciarSesionSeleccionado] = useState(true);
  const [registrarseSeleccionado, setRegistrarseSeleccionado] = useState(false);

  const handleIniciarSesionClick = () => {
    setIniciarSesionSeleccionado(true);
    setRegistrarseSeleccionado(false);
  };
  
  const handleRegistrarseClick = () => {
    setIniciarSesionSeleccionado(false);
    setRegistrarseSeleccionado(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <button onClick={handleShow} className="icon-button" >
            <img src={userIcon} alt="User" className="icon" />
            <p>Iniciar Sesion</p>
          </button>

      <Modal show={show} onHide={handleClose} size="md"  centered>
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
            <button className="forgot" onClick={handleClose}>
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