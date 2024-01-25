import React, { useState } from 'react';
import './ProcederCompra.css';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

function ProcederCompra() {
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [departamento, setDepartamento] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [puntoreferencia, setPuntoReferencia] = useState('');
  const [numerotelefono, setNumeroTelefono] = useState('');
  const firebaseUID = localStorage.getItem("FireBaseUID");
  
  // Suponiendo que tienes alguna forma de obtener el ID del usuario actual
  const id_usuario = firebaseUID;

  const handleDeliveryClick = () => {
    setIsDeliverySelected(true);
  };

  const handlePickupClick = () => {
    setIsDeliverySelected(false);
  };


  const handleDepartamentoChange = (selectedOption) => {
    setDepartamento(selectedOption.value);
  };

  // Función para manejar la creación de la entrega
  const handleSubmit = async () => {
    const esNumeroValido = (numero) => /^\d{8}$/.test(numero);

    if (!esNumeroValido(numerotelefono)) {
      alert('Por favor, ingrese un número de teléfono válido de 8 dígitos');
      return;
    }
  
    const datosEntrega = {
      departamento,
      municipio,
      direccion,
      puntoreferencia,
      id_usuario,
      estadoOrden: 'Ingresada',
      fecha_ingreso: new Date().toISOString(),
      numerotelefono
    };

    try {
      const response = await fetch('https://importasiahn.netlify.app/crearEntrega', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEntrega)
      });

      if (response.ok) {
        console.log('Entrega creada');
        alert('Orden creada con éxito');
      } else {
        console.error('Error al crear entrega');
        alert('Hubo un error al crear la orden'); 
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };
  const handleSubmit2 = async () => {
    const datosEntrega = {
      departamento,
      municipio,
      direccion,
      puntoreferencia,
      id_usuario,
      estadoOrden: 'Pendiente',
      fecha_ingreso: new Date().toISOString(),
      numerotelefono
    };

    try {
      const response = await fetch('http://localhost:3000/crearEntrega', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosEntrega)
      });

      if (response.ok) {
        console.log('Entrega creada');
      } else {
        console.error('Error al crear entrega');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };
  const options = [
    { value: 'Atlantida', label: 'Atlántida' },
    { value: 'Colon', label: 'Colón' },
    { value: 'Comayagua', label: 'Comayagua' },
    { value: 'Copan', label: 'Copán' },
    { value: 'Cortes', label: 'Cortés' },
    { value: 'Choluteca', label: 'Choluteca' },
    { value: 'ElParaiso', label: 'El Paraíso' },
    { value: 'FranciscoMorazan', label: 'Francisco Morazán' },
    { value: 'GraciasADios', label: 'Gracias a Dios' },
    { value: 'Intibuca', label: 'Intibucá' },
    { value: 'IslasDeLaBahia', label: 'Islas de la Bahía' },
    { value: 'LaPaz', label: 'La Paz' },
    { value: 'Lempira', label: 'Lempira' },
    { value: 'Ocotepeque', label: 'Ocotepeque' },
    { value: 'Olancho', label: 'Olancho' },
    { value: 'SantaBarbara', label: 'Santa Bárbara' },
    { value: 'Valle', label: 'Valle' },
    { value: 'Yoro', label: 'Yoro' },
  ];

  return (
    <div className="ProcederCompra">

      <div className="button-container">
        <button
          onClick={handleDeliveryClick}
          className={`botones delivery ${isDeliverySelected ? 'selected' : ''}`}
        >
          <p>Enviar a la Direccion</p>
        </button>
        <button
          onClick={handlePickupClick}
          className={`botones pick-up ${!isDeliverySelected ? 'selected' : ''}`}
        >
          <p>Recoger en tienda</p>
        </button>
      </div>
      {isDeliverySelected ? (
        <>
          {/* Contenido de los departamentos */}
          <div className="forms-container">
            <form className='contenedores' >
              <p>Departamento</p>
              <Select
                name="departamento"
                value={options.find((opt) => opt.value === departamento)}
                onChange={handleDepartamentoChange}
                options={options}
                isSearchable
                placeholder="Seleccione una opcion"
                className="select-with-scroll"
              />

            </form>

            {/* Contenido de los Municipios */}
            <p>Municipio</p>
            <Form.Control
              className='contenedores'
              type="text"
              placeholder="Ingrese un Municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
            />
            <p>Direccion</p>
            <Form.Control
              className='contenedores'
              type="text"
              placeholder="Ingrese una Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <p>Punto de Referencia</p>
            <Form.Control
              className='contenedores'
              type="text"
              placeholder="Ingrese un Punto de Referencia"
              value={puntoreferencia}
              onChange={(e) => setPuntoReferencia(e.target.value)}
            />
            <p>Numero de telefono</p>
            <Form.Control
              className='contenedores'
              type="text"
              placeholder="Ingrese un Número de Teléfono"
              value={numerotelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
            <button className='boton-siguiente' onClick={handleSubmit}>
              <p>Siguiente</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="forms-container">

            {/* Contenido de PickUp */}
            <p>Nombre de la persona que Recoge</p>
            <Form.Control className='contenedores' type="text" placeholder="Ingrese un Nombre" />
            <p>Numero de Identidad de la Persona que Recoge</p>
            <Form.Control className='contenedores' type="text" placeholder="Ingrese un Numero de Identidad " />
            <p>Numero de Telefono</p>
            <Form.Control className='contenedores' type="text" placeholder="Ingrese un Numero" />

            <button className='boton-siguiente' onClick={handleSubmit2}>
              <p>Siguiente</p>
            </button>


          </div>
        </>
      )}

    </div>
  );
}

export default ProcederCompra;
