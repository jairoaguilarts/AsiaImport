import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import logo from '../assets/LogoPng.png';
import './ConfirmacionCorreo.css';

function ConfirmacionCorreo(props) {
    return (
        <Modal show={true} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <img className='logo' src={logo} alt='logo_asia_import' />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1 className='texto_bold'>Confirmá tu Correo Electrónico</h1>
                <hr className='linea_azul' />
                <h2 className='texto_normal'>
                    Gracias por elegir Asia Import, con solo darle click al botón de confirmación vas a tener un catalogo completo de accesorios para celular y demás productos varios
                </h2>
                <Button className='button' onClick={props.onClose}>Ok</Button>
                <hr className='linea_naranja' />
                <p className='letra_peque'>
                    Si vos no fuiste el que solicitó la confirmación, ponte en contacto respondiendo este correo
                </p>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmacionCorreo;
