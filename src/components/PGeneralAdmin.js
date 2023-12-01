import React from 'react';
import './PGeneralAdmin.css';
import maleta from '../assets/maleta.png';
import dinero from '../assets/money.png';
import venta from '../assets/discounts.png';
import emp from '../assets/empleadoss.png';
import admin from '../assets/admin.png';
import AdmiNav from './AdmiNav';


function PGeneralAdmin() {
    return (
        <>
            <AdmiNav />
            <div className="main-container">
                <div className="primer-contenedor">
                    <div className="contenedor-box-info">
                        <div className="cajita">
                            <div className='titulo'> Ganancias (Mensuales)</div>
                            <div className='contenido-inf'>
                                <p>L. 45,000.00</p>
                                <img src={maleta} alt="maleta" />
                            </div>
                        </div>
                        <div className="cajita">
                            <div className='titulo'> Ganancias (Anuales)</div>
                            <div className='contenido-inf'>
                                <p>L. 108,000.00</p>
                                <img src={dinero} alt="money" />
                            </div>
                        </div>
                        <div className="cajita">
                            <div className='titulo'> Ventas Totales</div>
                            <div className='contenido-inf'>
                                <p>74,500 .uds</p>
                                <img src={venta} alt="venta$$$" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="segundo-contenedor">
                    <div className='contenedor-box-info'>
                        <div className='cajita-2'>
                            <div className='titulo'>Empleados</div>
                            <div className='contenido-inf'>
                                <p>38</p>
                                <img src={emp} alt="empleados" />
                            </div>
                        </div>
                        <div className='cajita-2'>
                            <div className='titulo'>Administradores</div>
                            <div className='contenido-inf'>
                                <p>5</p>
                                <img src={admin} alt="admin" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tercer-contenedor'>
                    <div className='contenedor-box-info'>
                        <div className='cajita-3'>
                            <div className='titulo'>
                                Grafica de Ganancias
                                <hr className='linea-divisora' />
                            </div>
                            <div className='contenido-inf'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PGeneralAdmin;