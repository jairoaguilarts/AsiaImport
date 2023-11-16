import React, { useState } from "react";
import "./AdministrarEmpleados.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AdministrarEmpleados() {
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);

  const handleShowAgregar = () => setShowAgregar(true);
  const handleCloseAgregar = () => setShowAgregar(false);

  const handleShowEditar = () => setShowEditar(true);
  const handleCloseEditar = () => setShowEditar(false);
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

            <Button className="botones" onClick={handleCloseAgregar}>
              AGREGAR EMPLEADO
            </Button>
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

            <Button className="botones" onClick={handleCloseEditar}>
              EDITAR EMPLEADO
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default AdministrarEmpleados;
