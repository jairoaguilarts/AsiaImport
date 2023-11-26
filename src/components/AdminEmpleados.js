import React, { useState, useEffect } from "react";
import "./AdminEmpleados.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AdminEmpleados = () => {
  const UserType = localStorage.getItem("UserType");
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [showHacerAdminConfirmar, setShowHacerAdminConfirmar] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch('https://importasia-api.onrender.com/empleados')
      .then(response => response.json())
      .then(data => setEmpleados(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const [formDataAgregar, setFormDataAgregar] = useState({
    nombre: "",
    numeroIdentidad: "",
    correo: "",
    contrasenia: "",
  });

  const [formDataModificar, setFormDataModificar] = useState({
    nombre: "",
    numeroIdentidad: "",
  });

  const handleShowAgregar = () => setShowAgregar(true);
  const handleCloseAgregar = () => setShowAgregar(false);

  const handleShowEditar = () => setShowEditar(true);
  const handleCloseEditar = () => setShowEditar(false);

  const handleConfirmacion = () => {
    handleShowConfirmar();
  };

  const handleShowConfirmar = () => setShowConfirmar(true);
  const handleCloseConfirmar = () => setShowConfirmar(false);
  const handleEliminarConfirmacion = () => {
    // Esta función se llama cuando se hace clic en "Eliminar"
    setShowEliminarConfirmar(true);
  };

  const handleChangeAgregar = (e) => {
    setFormDataAgregar({ ...formDataAgregar, [e.target.id]: e.target.value });
  };

  const handleChangeModificar = (e) => {
    setFormDataModificar({
      ...formDataModificar,
      [e.target.id]: e.target.value,
    });
  };

  const handleConfirmar = async () => {
    if (showAgregar) {
      //Agregar empleado
      const nombreApellido = formDataAgregar.formNombre.split(" ");
      const datosAgregar = {
        nombre: nombreApellido[0],
        apellido: nombreApellido[1],
        numeroIdentidad: formDataAgregar.formID,
        correo: formDataAgregar.formCorreo,
        contrasenia: formDataAgregar.formPass,
        userCreatingType: UserType,
      };

      try {
        const response = await fetch(
          "https://importasia-api.onrender.com/agregarEmpleado",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datosAgregar),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || response.status}`);
        }
        alert("Empleado agregado exitosamente");
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el registro: " + error.message);
      }
    } else if (showEditar) {
      //Modificar empleado
      const nombreApellido = formDataModificar.nombreEditar.split(" ");
      const datosEditar = {
        nombre: nombreApellido[0],
        apellido: nombreApellido[1],
        numeroIdentidad: formDataModificar.formIDEditar,
        correo: formDataModificar.formCorreoEditar,
        userModifyingType: UserType,
      };

      try {
        const response = await fetch(
          `https://importasia-api.onrender.com/modificarEmpleado?firebaseUID=${"scQCn79Pc0YbVisK3sYLYrhWt3T2"}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datosEditar),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || response.status}`);
        }
        alert("Empleado agregado exitosamente");
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error en el registro: " + error.message);
      }
    }
    setShowConfirmar(false);
    handleCloseEditar(); // Cerrar el modal de edición
  };

  const handleShowEliminarConfirmar = () => setShowEliminarConfirmar(true);
  const handleCloseEliminarConfirmar = () => setShowEliminarConfirmar(false);

  const handleShowHacerAdminConfirmar = () => setShowHacerAdminConfirmar(true);
  const handleCloseHacerAdminConfirmar = () =>
    setShowHacerAdminConfirmar(false);

  const handleHacerAdminConfirmacion = () => {
    handleShowHacerAdminConfirmar();
  };

  const handleHacerAdmin = () => {
    // Aquí puedes agregar la lógica para hacer admin al empleado
    alert("Empleado hecho admin");
    setShowHacerAdminConfirmar(false);
  };

  const handleEliminar = () => {
    // Aquí puedes agregar la lógica para eliminar el empleado
    alert("Empleado eliminado");
    handleCloseEliminarConfirmar();
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
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              return (
                <tr>
                  <td>{empleado.firebaseUID}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.correo}</td>
                  <td>
                    <button className="boton-anaranjado" onClick={handleHacerAdminConfirmacion}>
                      Hacer Admin
                    </button>
                    <button className="boton-verde" onClick={handleShowEditar}>
                      Editar
                    </button>
                    <button className="boton-rojo" onClick={handleEliminarConfirmacion}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
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
              onChange={handleChangeAgregar}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formID">
            <Form.Label>Numero de Identidad</Form.Label>
            <Form.Control
              type="input"
              placeholder="Numero de Identidad"
              onChange={handleChangeAgregar}
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formCorreo">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              onChange={handleChangeAgregar}
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formPass">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              onChange={handleChangeAgregar}
            />
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
          <Form.Group className="forms" controlId="nombreEditar">
            <Form.Label>Nombre de Empleado</Form.Label>
            <Form.Control
              type="input"
              placeholder="Nombre de Empleado"
              onChange={handleChangeModificar}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formCorreoEditar">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              onChange={handleChangeModificar}
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formIDEditar">
            <Form.Label>Numero de Identidad</Form.Label>
            <Form.Control
              type="input"
              placeholder="Numero de Identidad"
              onChange={handleChangeModificar}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="botones" onClick={handleConfirmar}>
            EDITAR EMPLEADO
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        className="modal-confirmar"
        show={showConfirmar}
        onHide={handleCloseConfirmar}
      >
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

      {/* Modal de confirmación de hacer admin */}
      <Modal
        show={showHacerAdminConfirmar}
        onHide={handleCloseHacerAdminConfirmar}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas hacer admin a este empleado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHacerAdminConfirmar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleHacerAdmin}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        className="modal-confirmar"
        show={showEliminarConfirmar}
        onHide={handleCloseEliminarConfirmar}
      >
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
