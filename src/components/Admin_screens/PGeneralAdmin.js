import React, { useState, useEffect } from 'react';
import './PGeneralAdmin.css';
import maleta from '../../assets/maleta.png';
import dinero from '../../assets/money.png';
import venta from '../../assets/discounts.png';
import emp from '../../assets/empleadoss.png';
import admin from '../../assets/admin.png';
import ordenesT from '../../assets/ordentotal.png'
import process from '../../assets/flechas.png'
import verified from '../../assets/verificar.png'
import complete from '../../assets/completo.png'
import AdmiNav from './AdmiNav';

function PGeneralAdmin() {
    const [sumaTotalOrdenes, setSumaTotalOrdenes] = useState(0);
    const [ordenes, setOrdenes] = useState([]);
    const [conteoUsuarios, setConteoUsuarios] = useState({ empleados: 0, administradores: 0 });

    const [estadisticas, setEstadisticas] = useState({
        totalOrdenes: 0,
        enProceso: 0,
        verificadas: 0,
        completadas: 0
    });

    const baseURL = 'https://importasia-api.onrender.com';

    const fetchSumaTotalOrdenes = async () => {
        try {
            const response = await fetch(`${baseURL}/suma-total-ordenes`);
            const data = await response.json();
            setSumaTotalOrdenes(data.sumaTotal);
        } catch (error) {
            console.error('Error al obtener las métricas:', error);
        }
    };

    const ordenesTotales = async () => {
        try {
            const response = await fetch(`${baseURL}/ordenes`);
            if (!response.ok) {
                throw new Error("Error al cargar las ordenes");
            }
            const data = await response.json();
            setOrdenes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const contarOrdenes = async () => {

        const estadisticasActualizadas = {
            totalOrdenes: ordenes.length,
            enProceso: 0,
            verificadas: 0,
            completadas: 0
        };

        ordenes.forEach(orden => {
            switch(orden.estadoOrden) {
                case "En Proceso":
                    estadisticasActualizadas.enProceso++;
                    break;
                case "Verificada":
                    estadisticasActualizadas.verificadas++;
                    break;
                case "Completada":
                    estadisticasActualizadas.completadas++;
                    break;
                default:
                    break;
            }
        });

        setEstadisticas(estadisticasActualizadas);
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

    const formatearMoneda = (cantidad) => {
        return cantidad.toLocaleString('es-HN', { style: 'currency', currency: 'HNL' });
    };

    useEffect(() => {
        fetchSumaTotalOrdenes();
        fetchConteoUsuarios();
        ordenesTotales();
    }, []);

    useEffect(() => {
        contarOrdenes();
    }, [ordenes]);

    return (
        <>
            <AdmiNav />
            <div className="main-container">
                <div className="primer-contenedor">
                    <div className="contenedor-box-info">
                        <div className="cajita">
                            <div className='titulo'> Ganancias Mensuales</div>
                            <div className='contenido-inf'>
                                <p>{formatearMoneda(sumaTotalOrdenes)}</p>
                                <img src={maleta} alt="maleta" />
                            </div>
                        </div>
                        <div className="cajita">
                            <div className='titulo'> Ganancias Anuales</div>
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
                <div className="primer-contenedor">
                    <div className="contenedor-box-info">
                        <div className="cajita">
                            <div className='titulo'>Total de Ordenes</div>
                            <div className='contenido-inf'>
                                <p>{estadisticas.totalOrdenes}</p>
                                <img src={ordenesT} alt="ordenes" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="segundo-contenedor">
                    <div className='contenedor-box-info'>
                        <div className='cajita-2'>
                            <div className='titulo'>Ordenes En Proceso</div>
                            <div className='contenido-inf'>
                                <p>{estadisticas.enProceso}</p>
                                <img src={process} alt="enProceso" />
                            </div>
                        </div>
                        <div className='cajita-2'>
                            <div className='titulo'>Ordenes Verificadas</div>
                            <div className='contenido-inf'>
                                <p>{estadisticas.verificadas}</p>
                                <img src={verified} alt="verificada" />
                            </div>
                        </div>
                        <div className='cajita-2'>
                            <div className='titulo'>Ordenes Completadas</div>
                            <div className='contenido-inf'>
                                <p>{estadisticas.completadas}</p>
                                <img src={complete} alt="completado" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Delimitacion para anadir contenedores (╯°□°）╯︵ ┻━┻ */}
            </div>
        </>
    );
};

export default PGeneralAdmin;
