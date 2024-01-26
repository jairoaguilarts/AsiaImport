import React, { useState } from 'react';
import './Pago.css'; // Asegúrate de importar el CSS

function Pago() {
  const [metodoPago, setMetodoPago] = useState('');

  const mostrarFormularioTarjeta = () => (
    <div className="formulario">
      <label>
        Número de Tarjeta:
        <input type="text" placeholder="Número de Tarjeta" />
      </label>
      <label>
        Fecha de Expiración:
        <input type="month" />
      </label>
      <label>
        CVV:
        <input type="text" placeholder="CVV" />
      </label>
      <div className="boton-contenedor">
      <button  type="submit">Pagar</button>
      </div>
    </div>
  );

  const mostrarInformacionTransferencia = () => (
    <div className="formulario">
      <p>Información para transferencia bancaria:</p>
      <p>Número de cuenta: XXXXXX</p>
      <p>Banco: XXXXXX</p>
      <label>
        Subir imagen de la transferencia:
        <input type="file" />
      </label>
      <div className="boton-contenedor">
      <button type="submit">Enviar</button>
      </div>
    </div>
  );

  return (
    <div className="pago-container">
      <h2>Pantalla de Pago</h2>
      <div className="botones-container">
      <button onClick={() => setMetodoPago('tarjeta')}>Pagar con Tarjeta</button>
      <button onClick={() => setMetodoPago('transferencia')}>Transferencia Bancaria</button>
      <button onClick={() => setMetodoPago('efectivo')}>Pagar en Efectivo</button>
      </div>
      {metodoPago === 'tarjeta' && mostrarFormularioTarjeta()}
      {metodoPago === 'transferencia' && mostrarInformacionTransferencia()}
    </div>
  );
}

export default Pago;
