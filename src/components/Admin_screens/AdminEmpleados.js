import React, { useState, useEffect } from "react";
import "./AdminEmpleados.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CustomAlert from "../Informative_screens/CustomAlert.js";

const AdminEmpleados = () => {
  const UserType = localStorage.getItem("userType");
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [showHacerAdminConfirmar, setShowHacerAdminConfirmar] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [selectedFirebaseUID, setSelectedFirebaseUID] = useState(null);
  const [datosViejos, setdatosViejos] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  useEffect(() => {
    fetch("https://importasia-api.onrender.com/empleados")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error:", error));
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
    correo: "",
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
    const { name, value } = e.target;
    setFormDataModificar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSelectEmpleado = async (firebaseUID, actionType) => {
    setSelectedFirebaseUID(firebaseUID);
    if (actionType === "editar") {
      const empleadoData = await obtenerDatosDelEmpleado(firebaseUID);
      setdatosViejos({
        nombre: empleadoData.nombre + " " + empleadoData.apellido,
        numeroIdentidad: empleadoData.numeroIdentidad,
        correo: empleadoData.correo,
      });
      setFormDataModificar({
        nombre: empleadoData.nombre + " " + empleadoData.apellido,
        numeroIdentidad: empleadoData.numeroIdentidad,
        correo: empleadoData.correo,
      });
      handleShowEditar();
    } else if (actionType === "eliminar") {
      handleEliminarConfirmacion();
    } else if (actionType === "hacer-admin") {
      handleHacerAdminConfirmacion();
    }
  };


  const obtenerDatosDelEmpleado = async (firebaseUID) => {
    try {
      const response = await fetch(`https://importasia-api.onrender.com/soloEmpleado?firebaseUID=${firebaseUID}`);
      if (!response.ok) {
        throw new Error('Error al obtener datos del empleado');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener información del empleado:', error);
      throw error;
    }
  };

  const handleConfirmar = async () => {
    if (showAgregar) {
      // Agregar empleado
      const { nombre, numeroIdentidad, correo, contrasenia } = formDataAgregar;
      if (
        !nombre ||
        !nombre.trim() ||
        !numeroIdentidad ||
        !numeroIdentidad.trim() ||
        !correo ||
        !correo.trim() ||
        !contrasenia ||
        !contrasenia.trim()
      ) {
        mostrarAlerta("Todos los campos son necesarios", "danger");
        handleCloseConfirmar();
        return false;
      } else if (!/^[a-zA-Z ]+$/.test(nombre)) {
        mostrarAlerta("El nombre solo debe contener letras", "danger");
        handleCloseConfirmar();
        return;
      } else if (!/^\d+$/.test(numeroIdentidad)) {
        mostrarAlerta("El ID es incorrecto", "danger");
        handleCloseConfirmar();
        return;
      } else if (numeroIdentidad.length < 13) {
        mostrarAlerta("Ingrese un ID valido", "danger");
        handleCloseConfirmar();
        return;
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) {
        mostrarAlerta("Formato de correo electrónico no válido", "danger");
        handleCloseConfirmar();
        return;
      } else if (contrasenia.length < 6) {
        mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "danger");
        handleCloseConfirmar();
        return;
      }
  
      const datosAgregar = {
        nombre: nombre.split(" ")[0],
        apellido: nombre.split(" ")[1] || '', // Asegura que haya un apellido aunque el nombre sea un solo nombre
        numeroIdentidad,
        correo,
        contrasenia,
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
        mostrarAlerta("Empleado agregado exitosamente", "info");
        window.location.reload();
      } catch (error) {
        mostrarAlerta("Error al agregar empleado", "danger");
      }
    } else if (showEditar) {
      // Editar empleado
      const { nombre, numeroIdentidad, correo } = formDataModificar;
      if (!nombre.trim() || !numeroIdentidad.trim() || !correo.trim()) {
        mostrarAlerta("Nombre, número de identidad y correo son necesarios", "danger");
        return;
      }
      // Verificar si se han realizado cambios
      const cambios = nombre !== datosViejos.nombre ||
                      numeroIdentidad !== datosViejos.numeroIdentidad ||
                      correo !== datosViejos.correo;
  
      if (!cambios) {
        mostrarAlerta("No se han registrado cambios", "danger");
        return;
      }
  
      try {
        // Lógica para enviar los datos modificados del empleado al servidor
        const response = await fetch(`https://importasia-api.onrender.com/modificarEmpleado?firebaseUID=${selectedFirebaseUID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre.split(" ")[0],
            apellido: nombre.split(" ")[1] || '',
            numeroIdentidad,
            correo,
            userType: UserType,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || response.status}`);
        }
  
        mostrarAlerta("Empleado modificado exitosamente", "success");
        handleCloseEditar(); // Cierra el modal de editar
        window.location.reload(); // Recarga los datos
      } catch (error) {
        mostrarAlerta(error.message, "danger");
      }
    }
  
    // Cierra el modal de confirmación en cualquier caso
    setShowConfirmar(false);
  };
  

  const handleShowEliminarConfirmar = () => setShowEliminarConfirmar(true);
  const handleCloseEliminarConfirmar = () => setShowEliminarConfirmar(false);

  const handleShowHacerAdminConfirmar = () => setShowHacerAdminConfirmar(true);
  const handleCloseHacerAdminConfirmar = () =>
    setShowHacerAdminConfirmar(false);

  const handleHacerAdminConfirmacion = () => {
    handleShowHacerAdminConfirmar();
  };

  const handleHacerAdmin = async () => {
    if (!selectedFirebaseUID) {
      mostrarAlerta("No se ha seleccionado ningún empleado", "danger");
      return;
    }

    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/hacerAdmin?firebaseUID=${selectedFirebaseUID}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta(
          "Empleado promovido a administrador exitosamente",
          "success"
        );
        window.location.reload();
      } else {
        throw new Error(data.error || "Error al hacer admin al empleado");
      }
    } catch (error) {
      mostrarAlerta(error.message, "danger");
    }
    setShowHacerAdminConfirmar(false);
  };

  const handleEliminar = async () => {
    if (!selectedFirebaseUID) {
      mostrarAlerta("No se ha seleccionado ningún empleado", "danger");
      return;
    }

    const datosEliminar = {
      userDeletingType: "*",
    };

    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/eliminarEmpleado?firebaseUID=${selectedFirebaseUID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEliminar),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      mostrarAlerta("Empleado eliminado exitosamente", "info");
      setEmpleados(
        empleados.filter(
          (empleado) => empleado.firebaseUID !== selectedFirebaseUID
        )
      );
    } catch (error) {
      mostrarAlerta("Error al eliminar empleado", "danger");
    }

    handleCloseEliminarConfirmar();
    setSelectedFirebaseUID(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleadoData = await obtenerDatosDelEmpleado(selectedFirebaseUID);

        setFormDataModificar({
          nombre: empleadoData.nombre + " " + empleadoData.apellido || '',
          numeroIdentidad: empleadoData.numeroIdentidad || '',
          correo: empleadoData.correo || '',
        });
      } catch (error) {
      }
    };

    if (selectedFirebaseUID) {
      fetchData();
    }
  }, [selectedFirebaseUID]);

  return (
    <div>
      <h1 className="titulo-empleados2">Empleados</h1>
      <hr
        style={{
          borderColor: "#01A6FF",
          borderWidth: "4px",
          borderStyle: "solid",
        }}
      />
      <div className="admin-empleados-container">
        <button className="boton-anaranjado2" onClick={handleShowAgregar}>
          + Agregar Empleado
        </button>
        <table className="tabla-empleados">
          <thead>
            <tr>
              <th>FireBase UID</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              const inicio = empleado.firebaseUID.slice(0, 2);
              const fin = empleado.firebaseUID.slice(-3);
              return (
                <tr key={empleado.firebaseUID}>
                  <td>{inicio + "..." + fin}</td>
                  <td>{empleado.nombre + " " + empleado.apellido}</td>
                  <td>{empleado.correo}</td>
                  <td>
                    <button
                      className="boton-anaranjado"
                      onClick={() =>
                        handleSelectEmpleado(
                          empleado.firebaseUID,
                          "hacer-admin"
                        )
                      }
                    >
                      Hacer Admin
                    </button>
                    <button
                      className="boton-verde"
                      onClick={() =>
                        handleSelectEmpleado(empleado.firebaseUID, "editar")
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="boton-rojo"
                      onClick={() =>
                        handleSelectEmpleado(empleado.firebaseUID, "eliminar")
                      }
                    >
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
        id="nombre" // Asegúrate de que este id coincida con la clave en formDataAgregar
        type="input"
        placeholder="Nombre de Empleado"
        value={formDataAgregar.nombre}
        onChange={handleChangeAgregar}
        autoFocus
      />
    </Form.Group>
    <Form.Group className="forms" controlId="formNumeroIdentidad">
      <Form.Label>Numero de Identidad</Form.Label>
      <Form.Control
        id="numeroIdentidad" // Asegúrate de que este id coincida con la clave en formDataAgregar
        type="input"
        placeholder="Numero de Identidad"
        value={formDataAgregar.numeroIdentidad}
        onChange={handleChangeAgregar}
      />
    </Form.Group>
    <Form.Group className="forms" controlId="formCorreo">
      <Form.Label>Correo Electrónico</Form.Label>
      <Form.Control
        id="correo" // Asegúrate de que este id coincida con la clave en formDataAgregar
        type="email"
        placeholder="Correo Electrónico"
        value={formDataAgregar.correo}
        onChange={handleChangeAgregar}
      />
    </Form.Group>
    <Form.Group className="forms" controlId="formContrasenia">
      <Form.Label>Contraseña</Form.Label>
      <Form.Control
        id="contrasenia" // Asegúrate de que este id coincida con la clave en formDataAgregar
        type="password"
        placeholder="Contraseña"
        value={formDataAgregar.contrasenia}
        onChange={handleChangeAgregar}
      />
    </Form.Group>


          <button className="botones" onClick={handleConfirmacion}>
            AGREGAR EMPLEADO
          </button>
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
              placeholder="Nombre de usuario"
              name="nombre" // Cambiado de id a name
              onChange={handleChangeModificar}
              value={formDataModificar.nombre}
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formCorreoEditar">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              name="correo" // Cambiado de id a name
              onChange={handleChangeModificar}
              value={formDataModificar.correo}
            />
          </Form.Group>
          <Form.Group className="forms" controlId="formIDEditar">
            <Form.Label>Número de Identidad</Form.Label>
            <Form.Control
              type="input"
              placeholder="Número de Identidad"
              name="numeroIdentidad" // Cambiado de id a name
              onChange={handleChangeModificar}
              value={formDataModificar.numeroIdentidad}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button className="botones" onClick={handleConfirmar}>
            EDITAR EMPLEADO
          </Button>
        </Modal.Footer>
        {showAlert && (
          <CustomAlert
            className="alerta"
            message={alertMessage}
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
          />
        )}
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
