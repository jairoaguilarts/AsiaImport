import React, { useState, useEffect } from "react";
import "./ProcederCompra.css";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const opcionInicialDepartamento = {
  value: "",
  label: "Seleccione un departamento",
};

function ProcederCompra() {
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [isAgregarDireccionSelected, setIsAgregarDireccionSelected] =
    useState(true);
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [identidadUser, setIdentidadUser] = useState("");
  const [puntoreferencia, setPuntoReferencia] = useState("");
  const [numerotelefono, setNumeroTelefono] = useState("");
  const firebaseUID = localStorage.getItem("FireBaseUID");
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(
    opcionInicialDepartamento
  );
  const [tipoOrden, setTipoOrden] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [direcciones, setDirecciones] = useState([]);
  const navigate = useNavigate();
  // Suponiendo que tienes alguna forma de obtener el ID del usuario actual
  const id_usuario = firebaseUID;

  useEffect(() => {
    fetch(
      `https://importasia-api.onrender.com/cargarDirecciones?userFirebaseUID=${firebaseUID}`
    )
      .then((response) => response.json())
      .then((data) => setDirecciones(data.direcciones))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSeleccionarDireccion = async (_id) => {
    setIsAgregarDireccionSelected(false);
    fetch(`https://importasia-api.onrender.com/cargarDireccion?_id=${_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.direccion) {
          const direccion = data.direccion[0];
          setDepartamentoSeleccionado({
            value: direccion.departamento,
            label: direccion.departamento,
          });
          setDepartamento(direccion.departamento);
          setMunicipio(direccion.municipio);
          setDireccion(direccion.direccion);
          setPuntoReferencia(direccion.puntoReferencia);
          setNumeroTelefono(direccion.numeroTelefono);
        } else {
          console.error("Error en los datos del servidor");
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor", error);
      });
  };

  const handleLimpiarCampos = () => {
    setIsAgregarDireccionSelected(true);
    setDepartamentoSeleccionado(opcionInicialDepartamento);
    setMunicipio("");
    setDireccion("");
    setPuntoReferencia("");
    setNumeroTelefono("");
  };

  const handleAgregarDireccion = async () => {
    try {
      const dataDireccion = {
        userFirebaseUID: firebaseUID,
        departamento,
        municipio,
        direccion,
        puntoReferencia: puntoreferencia,
        numeroTelefono: numerotelefono,
      };

      const response = await fetch(
        "https://importasia-api.onrender.com/agregarDireccion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataDireccion),
        }
      );

      if (response.ok) {
        Procederpago();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeliveryClick = () => {
    setIsDeliverySelected(true);
  };

  const handlePickupClick = () => {
    setIsDeliverySelected(false);
  };

  const handleDepartamentoChange = (selectedOption) => {
    setDepartamentoSeleccionado(selectedOption);
    setDepartamento(selectedOption.value);
  };

  const validarCamposCompletos = () => {
    const campos = [
      {
        valor: numerotelefono,
        mensaje: 'El campo "Número de Teléfono" es obligatorio.',
      },
    ];

    if (isDeliverySelected) {
      campos.push(
        {
          valor: departamento,
          mensaje: 'El campo "Departamento" es obligatorio.',
        },
        { valor: municipio, mensaje: 'El campo "Municipio" es obligatorio.' },
        { valor: direccion, mensaje: 'El campo "Dirección" es obligatorio.' },
        {
          valor: puntoreferencia,
          mensaje: 'El campo "Punto de Referencia" es obligatorio.',
        }
      );
    } else {
      campos.push({
        valor: nombreUsuario,
        mensaje: 'El campo "Nombre" es obligatorio.',
      });
      campos.push({
        valor: identidadUser,
        mensaje: 'El campo "Número de Identidad" es obligatorio.',
      });
    }

    for (let campo of campos) {
      if (!campo.valor || campo.valor.trim() === "") {
        Swal.fire({
          icon: "warning",
          title: "Campo Requerido",
          text: campo.mensaje,
        });
        return false;
      }
    }

    return true;
  };

  const Procederpago = () => {
    const esNumeroValido = (numero) => /^\d{8}$/.test(numero);
    const esMunicipioValido = (municipio) =>
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(municipio);
    const esIdValido = (id) => /^\d{13}$/.test(id);

    if (!validarCamposCompletos()) return;
    if (isDeliverySelected) {
      if (!esMunicipioValido(municipio)) {
        Swal.fire({
          icon: "warning",
          title: "Validación necesaria",
          text: "Por favor, ingrese un municipio válido (solo letras)",
        });
        return;
      }
    } else {
      if (!esIdValido(identidadUser)) {
        Swal.fire({
          icon: "warning",
          title: "Validación de Identidad",
          text: "Por favor, ingrese un número de identidad válido de 13 dígitos",
        });
        return;
      }
    }

    if (!esNumeroValido(numerotelefono)) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Teléfono",
        text: "Por favor, ingrese un número de teléfono válido de 8 dígitos",
      });
      return;
    }
    handleSubmit();
    setDepartamento("");
    setMunicipio("");
    setDireccion("");
    setPuntoReferencia("");
    setNumeroTelefono("");
    setDepartamentoSeleccionado(opcionInicialDepartamento);
    navigate("/pago");
  };
  const ProcederpagoP = () => {
    const esNumeroValido = (numero) => /^\d{8}$/.test(numero);
    const esMunicipioValido = (municipio) =>
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(municipio);
    const esIdValido = (id) => /^\d{13}$/.test(id);

    if (!validarCamposCompletos()) return;
    if (isDeliverySelected) {
      if (!esMunicipioValido(municipio)) {
        Swal.fire({
          icon: "warning",
          title: "Validación necesaria",
          text: "Por favor, ingrese un municipio válido (solo letras)",
        });
        return;
      }
    } else {
      if (!esIdValido(identidadUser)) {
        Swal.fire({
          icon: "warning",
          title: "Validación de Identidad",
          text: "Por favor, ingrese un número de identidad válido de 13 dígitos",
        });
        return;
      }
    }

    if (!esNumeroValido(numerotelefono)) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Teléfono",
        text: "Por favor, ingrese un número de teléfono válido de 8 dígitos",
      });
      return;
    }
    handleSubmit();
    setDepartamento("");
    setMunicipio("");
    setDireccion("");
    setPuntoReferencia("");
    setNumeroTelefono("");
    setDepartamentoSeleccionado(opcionInicialDepartamento);
    navigate("/pagoP");
  };

  const handleSubmit = async () => {
    const esIdValido = (id) => /^\d{13}$/.test(id);

    if (!validarCamposCompletos()) return;

    setDepartamento("");
    setMunicipio("");
    setDireccion("");
    setPuntoReferencia("");
    setNumeroTelefono("");
    setDepartamentoSeleccionado(opcionInicialDepartamento);

    let tipoOrdenTemp;
    if (isDeliverySelected) {
      tipoOrdenTemp = "delivery";
      setTipoOrden(tipoOrdenTemp);
      setNombreUsuario("");
      setIdentidadUser("");
    } else {
      if (!esIdValido(identidadUser)) {
        alert("Por favor, ingrese un número de identidad valido de 13 digitos");
        return;
      }
      tipoOrdenTemp = "pickup";
      setTipoOrden(tipoOrdenTemp);
      setDepartamento("");
      setMunicipio("");
      setDireccion("");
      setPuntoReferencia("");
    }

    const datosEntrega = {
      departamento,
      municipio,
      direccion,
      puntoreferencia,
      firebaseUID,
      estadoOrden: "En Proceso",
      fecha_ingreso: new Date().toISOString(),
      numerotelefono,
      nombreUsuario,
      identidadUser,
      tipoOrden: tipoOrdenTemp,
    };

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/crearEntrega",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEntrega),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Entrega creada");
        localStorage.setItem("entregaID", responseData._id);
        setDepartamento("");
        setMunicipio("");
        setDireccion("");
        setPuntoReferencia("");
        setNumeroTelefono("");
        setDepartamentoSeleccionado(opcionInicialDepartamento);
        setNombreUsuario("");
        setIdentidadUser("");
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Entrega creada con éxito",
        });
      } else {
        console.error("Error al crear entrega");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al crear la orden",
        });
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
    }
  };

  const options = [
    { value: "Atlantida", label: "Atlántida" },
    { value: "Colon", label: "Colón" },
    { value: "Comayagua", label: "Comayagua" },
    { value: "Copan", label: "Copán" },
    { value: "Cortes", label: "Cortés" },
    { value: "Choluteca", label: "Choluteca" },
    { value: "ElParaiso", label: "El Paraíso" },
    { value: "FranciscoMorazan", label: "Francisco Morazán" },
    { value: "GraciasADios", label: "Gracias a Dios" },
    { value: "Intibuca", label: "Intibucá" },
    { value: "IslasDeLaBahia", label: "Islas de la Bahía" },
    { value: "LaPaz", label: "La Paz" },
    { value: "Lempira", label: "Lempira" },
    { value: "Ocotepeque", label: "Ocotepeque" },
    { value: "Olancho", label: "Olancho" },
    { value: "SantaBarbara", label: "Santa Bárbara" },
    { value: "Valle", label: "Valle" },
    { value: "Yoro", label: "Yoro" },
  ];

  return (
    <div className="ProcederCompra">
      <div className="button-container">
        <button
          onClick={handleDeliveryClick}
          className={`botones delivery ${isDeliverySelected ? "selected" : ""}`}
        >
          <p>Enviar a la Direccion</p>
        </button>
        <button
          onClick={handlePickupClick}
          className={`botones pick-up ${!isDeliverySelected ? "selected" : ""}`}
        >
          <p>Recoger en tienda</p>
        </button>
      </div>
      {isDeliverySelected ? (
        <>
          <div className="card-container">
            {direcciones.map((direccion) => {
              return (
                <div key={direccion._id} className="card-direcciones">
                  <p className="heading-direcciones">
                    {direccion.departamento}
                  </p>
                  <p className="para-direcciones">{direccion.direccion}</p>
                  <div className="overlay-direcciones"></div>
                  <button
                    className="card-btn-direcciones"
                    onClick={() => handleSeleccionarDireccion(direccion._id)}
                  >
                    Seleccionar
                  </button>
                </div>
              );
            })}
            <div className="card-direcciones">
              <p className="heading-direcciones">Agregar Direccion</p>
              <p className="para-direcciones">+</p>
              <div className="overlay-direcciones"></div>
              <button
                className="card-btn-direcciones"
                onClick={handleLimpiarCampos}
              >
                Seleccionar
              </button>
            </div>
          </div>
          {/* Contenido de los departamentos */}
          <div className="forms-container">
            <form className="contenedores">
              <p>Departamento</p>
              <Select
                id="departamento"
                name="departamento"
                value={departamentoSeleccionado}
                onChange={handleDepartamentoChange}
                options={[opcionInicialDepartamento, ...options]}
                isSearchable
                placeholder="Seleccione una opción"
                className="select-with-scroll"
              />
            </form>

            {/* Contenido de los Municipios */}
            <p>Municipio</p>
            <Form.Control
              id="municipio"
              className="contenedores"
              type="text"
              placeholder="Ingrese un Municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
            <p>Direccion</p>
            <Form.Control
              id="direccion"
              className="contenedores"
              type="text"
              placeholder="Ingrese una Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <p>Punto de Referencia</p>
            <Form.Control
              id="puntoReferencia"
              className="contenedores"
              type="text"
              placeholder="Ingrese un Punto de Referencia"
              value={puntoreferencia}
              onChange={(e) => setPuntoReferencia(e.target.value)}
            />
            <p>Numero de telefono</p>
            <Form.Control
              id="numeroTelefono"
              className="contenedores"
              type="text"
              placeholder="Ingrese un Número de Teléfono"
              value={numerotelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
            {isAgregarDireccionSelected ? (
              <>
                <button
                  className="boton-siguiente"
                  onClick={handleAgregarDireccion}
                >
                  <p>Agregar Direccion</p>
                </button>
              </>
            ) : (
              <>
                <button className="boton-siguiente" onClick={Procederpago}>
                  <p>Siguiente</p>
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="forms-container">
            {/* Contenido de PickUp */}
            <p>Nombre de la persona que Recoge</p>
            <Form.Control
              className="contenedores"
              type="text"
              placeholder="Ingrese un Nombre"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <p>Numero de Identidad de la Persona que Recoge</p>
            <Form.Control
              className="contenedores"
              type="text"
              placeholder="Ingrese un Numero de Identidad "
              value={identidadUser}
              onChange={(e) => setIdentidadUser(e.target.value)}
            />
            <p>Numero de Telefono</p>
            <Form.Control
              className="contenedores"
              type="text"
              placeholder="Ingrese un Numero"
              value={numerotelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />

            <button className="boton-siguiente" onClick={ProcederpagoP}>
              <p>Siguiente</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProcederCompra;
