import React, { useState } from "react";
import "./AdministrarEmpleados.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AdministrarEmpleados() {
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const handleShowAgregar = () => setShowAgregar(true);
  const handleShowEditar = () => setShowEditar(true);

  const handleCloseAgregar = () => setShowAgregar(false);
  const handleCloseEditar = () => setShowEditar(false);

  const handleConfirmacion = () => {
    // Esta función se llama cuando se hace clic en "Agregar" o "Editar"
    handleShowConfirmar();
  }

  const handleShowConfirmar = () => setShowConfirmar(true);
  const handleCloseConfirmar = () => setShowConfirmar(false);

  const handleConfirmar = () => {
    alert("Cambio Realizado");
    setShowConfirmar(false);
    setShowAgregar(false);
    setShowEditar(false);
    // Aquí puedes agregar la lógica para agregar o editar el empleado
  };

  return (
    <div className="contenedor-principal">
      {/*Agregar Empleado */}
      <div className="container-agregar">
        <button className=" btn-agregar" onClick={handleShowAgregar}>
          Agregar Empleado
        </button>

        <Modal show={showAgregar} onHide={handleCloseAgregar}>
          <Modal.Header className="encabezados" closeButton>
            <Modal.Title className="titulos">Agregar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="cuerpo">
            <Form.Group className="forms" controlId="formNombre">
              <Form.Label>Nombre de Empleado</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nombre de Empleado"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="forms" controlId="formCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Correo Electrónico" />
            </Form.Group>
            <Form.Group className="forms" controlId="formID">
              <Form.Label>Numero de Identidad</Form.Label>
              <Form.Control type="input" placeholder="Numero de Identidad" />
            </Form.Group>

            <button className="botones" onClick={handleConfirmacion}>
              AGREGAR EMPLEADO
            </button>
          </Modal.Body>
        </Modal>
      </div>

      {/*Editar Empleado */}
      <div className="container-editar">
        <button className=" btn-editar" onClick={handleShowEditar}>
          Editar
        </button>

        <Modal show={showEditar} onHide={handleCloseEditar}>
          <Modal.Header className="encabezados" closeButton>
            <Modal.Title className="titulos">Editar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body className="cuerpo">
            <Form.Group className="forms" controlId="formNombre-editar">
              <Form.Label>Nombre de Empleado</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nombre de Empleado"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="forms" controlId="formCorreo-editar">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Correo Electrónico" />
            </Form.Group>
            <Form.Group className="forms" controlId="formID-editar">
              <Form.Label>Numero de Identidad</Form.Label>
              <Form.Control type="input" placeholder="Numero de Identidad" />
            </Form.Group>

            <button className="botones" onClick={handleConfirmacion}>
              EDITAR EMPLEADO
            </button>
          </Modal.Body>
        </Modal>

        <Modal className="modal-confirmar" show={showConfirmar} onHide={handleCloseConfirmar}>
          <Modal.Header closeButton>
            <Modal.Title>Desea Confirmar su Cambio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Button variant="secondary" onClick={handleCloseConfirmar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmar}>
              Confirmar
            </Button>
            {/* Contenido del cuerpo del modal, si es necesario */}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AdministrarEmpleados;
