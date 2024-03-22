import React, { useEffect, useState } from 'react';

const ConsultaEstado = ({ steps, triggerNextStep }) => {
    const [estado, setEstado] = useState('');
    const numeroPedido = steps['wait-pedido'].value; // Obtiene el número de pedido ingresado por el usuario

    useEffect(() => {
        consultarEstadoPedido(numeroPedido);
    }, [numeroPedido]);

    const consultarEstadoPedido = async (numeroPedido) => {
        // Asegúrate de reemplazar 'localhost:3000' si tu servidor corre en un puerto diferente
        const url = `https://importasia-api.onrender.com/consultarEstado2?numeroPedido=${numeroPedido}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setEstado(data.message); // Asumiendo que el mensaje del servidor viene en esta forma
            } else {
                throw new Error(data.message || 'Error al consultar el estado del pedido');
            }
        } catch (error) {
            setEstado('Hubo un error al consultar el estado de tu pedido. Por favor, intenta de nuevo más tarde.');
            console.error('Error al consultar el estado del pedido:', error);
        } finally {
            triggerNextStep(); // Esto avanza al próximo paso independientemente del resultado
        }
    };

    return (
        <div>
            {estado}
        </div>
    );
};

export default ConsultaEstado;
