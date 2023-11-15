import React, { useState } from 'react';
import './ProcederCompra.css';  // Asegúrate de importar el archivo de estilos CSS correspondiente
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

function ProcederCompra() {
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [departamento, setDepartamento] = useState('');

  const handleDeliveryClick = () => {
    setIsDeliverySelected(true);
  };

  const handlePickupClick = () => {
    setIsDeliverySelected(false);
  };


  const handleDepartamentoChange = (selectedOption) => {
    setDepartamento(selectedOption.value);
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
      <Form.Control className='contenedores' type="text" placeholder="Ingrese un Municipio" />
      <p>Direccion de Envio 1</p>
      <Form.Control className='contenedores' type="text" placeholder="Ingrese una Direccion" />
      <p>Direccion de Envio 2</p>
      <Form.Control className='contenedores' type="text" placeholder="Ingrese una Direccion" />
      <p>Numero de Telefono</p>
      <Form.Control className='contenedores' type="text" placeholder="Ingrese un Numero" />

      <button className='boton-siguiente' >
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
            <Form.Control className='contenedores' type="text" placeholder="Ingrese un Numero de Identidad "/>
            <p>Numero de Telefono</p>
            <Form.Control className='contenedores' type="text" placeholder="Ingrese un Numero" />

            <button className='boton-siguiente' >
              <p>Siguiente</p>
            </button>


      </div>
      </>
     )}
     
    </div>
  );
}

export default ProcederCompra;
