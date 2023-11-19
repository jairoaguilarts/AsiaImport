import React, { useState } from 'react';
import './Modal.css'; // Asegúrate de tener este archivo de estilos

import lockIcon from '../assets/locked.png'; // Asegúrate de que la ruta sea correcta
import visibleIcon from '../assets/visible.png'; // Asegúrate de que la ruta sea correcta

const Modal = ({ onClose }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown => !passwordShown);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <img src={lockIcon} alt="Lock" className="lock-icon" />
          <h4>Cambiar Contraseña</h4>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="current-password">Contraseña Actual</label>
              <input type={passwordShown ? "text" : "password"} id="current-password" />
              <img src={visibleIcon} alt="Show" className="visibility-icon" onClick={togglePasswordVisiblity} />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">Nueva Contraseña</label>
              <input type={passwordShown ? "text" : "password"} id="new-password" />
              <img src={visibleIcon} alt="Show" className="visibility-icon" onClick={togglePasswordVisiblity} />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirme Contraseña</label>
              <input type={passwordShown ? "text" : "password"} id="confirm-password" />
              <img src={visibleIcon} alt="Show" className="visibility-icon" onClick={togglePasswordVisiblity} />
            </div>
            <button type="submit" className="submit-button">Cambiar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
