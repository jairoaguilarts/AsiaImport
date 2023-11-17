// Importa los componentes y el CSS necesario
import React, { useState } from "react";
import "./AdminEmpleados.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AdminEmpleados = () => {
    const [showAgregar, setShowAgregar] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);
    const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);

    const handleShowAgregar = () => setShowAgregar(true);
    const handleCloseAgregar = () => setShowAgregar(false);

    const handleShowEditar = () => setShowEditar(true);
    const handleCloseEditar = () => setShowEditar(false);

    const handleConfirmacion = () => {
        // Esta función se llama cuando se hace clic en "Agregar" o "Editar"
        handleShowConfirmar();
    };

    const handleShowConfirmar = () => setShowConfirmar(true);
    const handleCloseConfirmar = () => setShowConfirmar(false);
    const handleEliminarConfirmacion = () => {
        // Esta función se llama cuando se hace clic en "Eliminar"
        setShowEliminarConfirmar(true);
    };

    const handleConfirmar = () => {
        // Aquí puedes agregar la lógica para agregar o editar el empleado
        alert("Cambio Realizado");
        setShowConfirmar(false);
        handleCloseEditar(); // Cerrar el modal de edición
    };

    const handleShowEliminarConfirmar = () => setShowEliminarConfirmar(true);
    const handleCloseEliminarConfirmar = () => setShowEliminarConfirmar(false);

    const handleEliminar = () => {
        // Aquí puedes agregar la lógica para eliminar el empleado
        alert("Empleado eliminado");
        handleCloseEliminarConfirmar(); // Cerrar el modal de confirmación de eliminación
    };

    

    return (
        <div>
            <h1 className="titulo-empleados">Empleados</h1>

            <div className="admin-empleados-container">
                <button className="boton-anaranjado" onClick={handleShowAgregar}>
                    Agregar Empleado
                </button>
                <table className="tabla-empleados">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aquí irían los datos de los empleados mapeados desde un estado o prop */}
                        <tr>
                            <td>1</td>
                            <td>Pedro Ramirez</td>
                            <td>p.rami@example.com</td>
                            <td>
                                <button className="boton-anaranjado">Hacer Admin</button>
                                <button className="boton-verde" onClick={handleShowEditar}>
                                    Editar
                                </button>
                                <button className="boton-rojo" onClick={handleEliminarConfirmacion}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        {/* Repetir por cada empleado */}
                    </tbody>
                </table>
            </div>

            {/* Modal para agregar empleado */}
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

            {/* Modal para editar empleado */}
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

            {/* Modal de confirmación */}
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
                    {/* Contenido del pie de página del modal, si es necesario */}
                </Modal.Footer>
            </Modal>
             {/* Modal de confirmación de eliminación */}
             <Modal className="modal-confirmar" show={showEliminarConfirmar} onHide={handleCloseEliminarConfirmar}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar a este empleado?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEliminarConfirmar}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleEliminar}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </div>
    );
};

export default AdminEmpleados;
