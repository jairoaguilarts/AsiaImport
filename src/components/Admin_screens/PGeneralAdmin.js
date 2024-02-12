import React, { useState, useEffect } from 'react';
import './PGeneralAdmin.css';
import maleta from '../../assets/maleta.png';
import dinero from '../../assets/money.png';
import venta from '../../assets/discounts.png';
import emp from '../../assets/empleadoss.png';
import admin from '../../assets/admin.png';
import AdmiNav from './AdmiNav';

function PGeneralAdmin() {
    const [sumaTotalOrdenes, setSumaTotalOrdenes] = useState(0);
    const [conteoUsuarios, setConteoUsuarios] = useState({ empleados: 0, administradores: 0 });

    const baseURL = 'https://importasia-api.onrender.com';

    const fetchSumaTotalOrdenes = async () => {
        try {
            const response = await fetch(`${baseURL}/suma-total-ordenes`);
            const data = await response.json();
            setSumaTotalOrdenes(data.sumaTotal);
        } catch (error) {
            console.error('Error al obtener la suma total de órdenes:', error);
        }
    };

    const fetchConteoUsuarios = async () => {
        try {
            const response = await fetch(`${baseURL}/conteo-usuarios`);
            const data = await response.json();
            setConteoUsuarios({
                empleados: parseInt(data['+'], 10),
                administradores: parseInt(data['*'], 10)
            });
        } catch (error) {
            console.error('Error al obtener el conteo de usuarios por tipo:', error);
        }
    };

    useEffect(() => {
        fetchSumaTotalOrdenes();
        fetchConteoUsuarios();
    }, []);

    const formatearMoneda = (cantidad) => {
        return cantidad.toLocaleString('es-HN', { style: 'currency', currency: 'HNL' });
    };

    return (
        <>
            <AdmiNav />
            <div className="main-container">
                <div className="primer-contenedor">
                    <div className="contenedor-box-info">
                        <div className="cajita">
                            <div className='titulo'> Ganancias (Mensuales)</div>
                            <div className='contenido-inf'>
                                <p>{formatearMoneda(sumaTotalOrdenes)}</p>
                                <img src={maleta} alt="maleta" />
                            </div>
                        </div>
                        <div className="cajita">
                            <div className='titulo'> Ganancias (Anuales)</div>
                            <div className='contenido-inf'>
                                <p>{formatearMoneda(sumaTotalOrdenes)}</p>
                                <img src={dinero} alt="money" />
                            </div>
                        </div>
                        <div className="cajita">
                            <div className='titulo'> Ventas Totales</div>
                            <div className='contenido-inf'>
                                <p>{formatearMoneda(sumaTotalOrdenes)}</p>
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
                                <p>{conteoUsuarios.empleados}</p>
                                <img src={emp} alt="empleados" />
                            </div>
                        </div>
                        <div className='cajita-2'>
                            <div className='titulo'>Administradores</div>
                            <div className='contenido-inf'>
                                <p>{conteoUsuarios.administradores}</p>
                                <img src={admin} alt="admin" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Más contenedores si es necesario */}
            </div>
        </>
    );
};

export default PGeneralAdmin;
