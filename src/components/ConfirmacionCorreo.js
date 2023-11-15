import React from 'react';
import './ConfirmacionCorreo.css';
import { Button } from 'react-bootstrap';
import logo from '../assets/LogoPng.png';

function confirmacion() {
    return (
        <div className='container'>
            <img className='logo' src={logo} alt='logo_asia_import'/>
            <hr className='linea_azul'/>
            <h1 className='texto_bold'>
                Confirmá tu Correo Electrónico
            </h1>
            <h2 className='texto_normal'>
                Gracias por elegir Asia Import, con solo darle click <br/>
                al botón de confirmación vas a tener un catalogo <br/>
                completo de accesorios para celular y demás productos <br/>
                varios
            </h2>
            <Button className='button'>Confirmar mi Cuenta</Button>
            <hr className='linea_naranja'/>
            <p className='letra_peque'>
                Si vos no fuiste el que solicitó la confirmación, ponte en contacto <br/>
                respondiendo este correo
            </p>
        </div>
    );
};

export default confirmacion;