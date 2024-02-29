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

const municipiosPorDepartamento = {
  Atlantida: [
    { value: "LaCeiba", label: "La Ceiba" },
    { value: "Tela", label: "Tela" },
    { value: "ElPorvenir", label: "El Porvenir" },
    { value: "LaMasica", label: "La Masica" },
    { value: "Arizona", label: "Arizona" },
  ],
  Colon: [
    { value: "Trujillo", label: "Trujillo" },
    { value: "Tocoa", label: "Tocoa" },
    { value: "Saba", label: "Sabá" },
    { value: "PuertoCastilla", label: "Puerto Castilla" },
    { value: "Limon", label: "Limón" },
  ],
  Comayagua: [
    { value: "Siguatepeque", label: "Siguatepeque" },
    { value: "LaLibertad", label: "La Libertad" },
    { value: "ElRosario", label: "El Rosario" },
    { value: "LasLajas", label: "Las Lajas" },
    { value: "Copan", label: "Copán" },
  ],
  Cortes: [
    { value: "SanPedroSula", label: "San Pedro Sula" },
    { value: "Choloma", label: "Choloma" },
    { value: "PuertoCortes", label: "Puerto Cortés" },
    { value: "Villanueva", label: "Villanueva" },
    { value: "LaLima", label: "La Lima" },
  ],
  Choluteca: [
    { value: "Choluteca", label: "Choluteca" },
    { value: "SanMarcosDeColon", label: "San Marcos de Colón" },
    { value: "Pespire", label: "Pespire" },
    { value: "Namasigue", label: "Namasigue" },
    { value: "ElTriunfo", label: "El Triunfo" },
  ],
  FranciscoMorazan: [
    { value: "Danli", label: "Danlí" },
    { value: "ElParaiso", label: "El Paraíso" },
    { value: "Yuscaran", label: "Yuscarán" },
    { value: "Teupasenti", label: "Teupasenti" },
    { value: "Guinope", label: "Guinope" },
  ],
  GraciasADios: [
    { value: "PuertoLempira", label: "Puerto Lempira" },
    { value: "BrusLaguna", label: "Brus Laguna" },
    { value: "Ahuas", label: "Ahuas" },
    { value: "JuanFranciscoBulnes", label: "Juan Francisco Bulnes" },
    { value: "Wampusirpe", label: "Wampusirpe" },
  ],
  Intibuca: [
    { value: "LaEsperanza", label: "La Esperanza" },
    { value: "Intibuca", label: "Intibucá" },
    { value: "JesusDeOtoro", label: "Jesús de Otoro" },
    { value: "SanJuan", label: "San Juan" },
    { value: "Yamaranguila", label: "Yamaranguila" },
  ],
  IslasDeLaBahia: [
    { value: "Roatan", label: "Roatán" },
    { value: "Utila", label: "Utila" },
    { value: "Guanaja", label: "Guanaja" },
    { value: "JoseSantosGuardiola", label: "José Santos Guardiola" },
    { value: "SantaElena", label: "Santa Elena" },
  ],
  LaPaz: [
    { value: "LaPaz", label: "La Paz" },
    { value: "Marcala", label: "Marcala" },
    { value: "SantaAna", label: "Santa Ana" },
    { value: "Yarula", label: "Yarula" },
    { value: "Lauterique", label: "Lauterique" },
  ],
  Lempira: [
    { value: "Gracias", label: "Gracias" },
    { value: "Erandique", label: "Erandique" },
    { value: "LaCampa", label: "La Campa" },
    { value: "SanMarcosDeCaiquin", label: "San Marcos de Caiquín" },
    { value: "Ocotepeque", label: "Ocotepeque" },
  ],
  Ocotepeque: [
    { value: "Ocotepeque", label: "Ocotepeque" },
    { value: "NuevaOcotepeque", label: "Nueva Ocotepeque" },
    { value: "SanMarcos", label: "San Marcos" },
    { value: "SantaFe", label: "Santa Fe" },
    { value: "Sinuapa", label: "Sinuapa" },
  ],
  Olancho: [
    { value: "Juticalpa", label: "Juticalpa" },
    { value: "Catacamas", label: "Catacamas" },
    { value: "Campamento", label: "Campamento" },
    { value: "SanFranciscoDeBecerra", label: "San Francisco de Becerra" },
    { value: "SantaMariaDelReal", label: "Santa María del Real" },
  ],
  SantaBarbara: [
    { value: "SantaBarbara", label: "Santa Bárbara" },
    { value: "SanNicolas", label: "San Nicolás" },
    { value: "Quimistan", label: "Quimistán" },
    { value: "PenaBlanca", label: "Peña Blanca" },
    { value: "Atima", label: "Atima" },
  ],
  Valle: [
    { value: "Nacaome", label: "Nacaome" },
    { value: "SanLorenzo", label: "San Lorenzo" },
    { value: "Langue", label: "Langue" },
    { value: "Alianza", label: "Alianza" },
    { value: "Amapala", label: "Amapala" },
  ],
  Yoro: [
    { value: "Yoro", label: "Yoro" },
    { value: "ElProgreso", label: "El Progreso" },
    { value: "Olanchito", label: "Olanchito" },
    { value: "SantaRita", label: "Santa Rita" },
    { value: "Morazan", label: "Morazán" },
  ],
  Copan: [
    { value: "SantaRosaDeCopan", label: "Santa Rosa de Copán" },
    { value: "CopanRuinas", label: "Copán Ruinas" },
    { value: "LaJigua", label: "La Jigua" },
    { value: "Cabañas", label: "Cabañas" },
    { value: "SanJoseDeCopan", label: "San José de Copán" },
  ],
  ElParaiso: [
    { value: "Danli", label: "Danlí" },
    { value: "ElParaiso", label: "El Paraíso" },
    { value: "Yuscaran", label: "Yuscarán" },
    { value: "Alauca", label: "Alauca" },
    { value: "Texiguat", label: "Texiguat" },
  ],
};

function ProcederCompra() {
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [isAgregarDireccionSelected, setIsAgregarDireccionSelected] = useState(
    true
  );
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
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState({
    value: "",
    label: "Seleccione un municipio",
  });

  // Suponiendo que tienes alguna forma de obtener el ID del usuario actual
  const id_usuario = firebaseUID;

  const cargarDirecciones = async () => {
    fetch(
      `https://importasia-api.onrender.com/cargarDirecciones?userFirebaseUID=${firebaseUID}`
    )
      .then((response) => response.json())
      .then((data) => setDirecciones(data.direcciones))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    cargarDirecciones();
  }, []);

  useEffect(() => {
    const municipios =
      municipiosPorDepartamento[departamentoSeleccionado.value] || [];
    setMunicipiosDisponibles(municipios);
    setMunicipioSeleccionado({ value: "", label: "Seleccione un municipio" });
  }, [departamentoSeleccionado]);

  const handleMunicipioChange = (selectedOption) => {
    setMunicipioSeleccionado(selectedOption);
    setMunicipio(selectedOption.value);
  };

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

          const municipioActualizado = {
            value: direccion.municipio,
            label: direccion.municipio, 
          };
          setMunicipioSeleccionado(municipioActualizado); 
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

  const handleEliminarDireccion = async (_id) => {
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/eliminarDireccion?_id=${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        cargarDirecciones();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al eliminar direccion",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.log(error);
    }
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
        departamento: departamentoSeleccionado.value,
        municipio: municipioSeleccionado.value,
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
      } else {
        if (response.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Limite direcciones",
            text:
              "No puede agregar mas direcciones, elimine una si desea agregar.",
          });
        }
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

    if (!municipioSeleccionado.value) {
      Swal.fire({
        icon: "warning",
        title: "Campo Requerido",
        text: 'El campo "Municipio" es obligatorio.',
      });
      return false;
    }

    if (isDeliverySelected) {
      campos.push(
        {
          valor: departamento,
          mensaje: 'El campo "Departamento" es obligatorio.',
        },
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
          text:
            "Por favor, ingrese un número de identidad válido de 13 dígitos",
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
          text:
            "Por favor, ingrese un número de identidad válido de 13 dígitos",
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
        Swal.fire({
          icon: "warning",
          title: "Formato invalido",
          text:
            "Por favor, ingrese un número de identidad valido de 13 digitos",
          confirmButtonText: "Ok",
        });
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
      departamento: departamentoSeleccionado.value,
      municipio: municipioSeleccionado.value,
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
                  <button
                    class="bin-button"
                    onClick={() => handleEliminarDireccion(direccion._id)}
                  >
                    <svg
                      class="bin-top"
                      viewBox="0 0 39 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="5"
                        x2="39"
                        y2="5"
                        stroke="white"
                        stroke-width="4"
                      ></line>
                      <line
                        x1="12"
                        y1="1.5"
                        x2="26.0357"
                        y2="1.5"
                        stroke="white"
                        stroke-width="3"
                      ></line>
                    </svg>
                    <svg
                      class="bin-bottom"
                      viewBox="0 0 33 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id="path-1-inside-1_8_19" fill="white">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                      </mask>
                      <path
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        fill="black"
                        mask="url(#path-1-inside-1_8_19)"
                      ></path>
                      <path
                        d="M12 6L12 29"
                        stroke="black"
                        stroke-width="4"
                      ></path>
                      <path d="M21 6V29" stroke="black" stroke-width="4"></path>
                    </svg>
                  </button>

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
            <Select
              id="municipio"
              value={municipioSeleccionado}
              onChange={handleMunicipioChange} // Asegúrate de usar esta función para manejar cambios
              options={municipiosDisponibles}
              placeholder="Seleccione un municipio"
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

