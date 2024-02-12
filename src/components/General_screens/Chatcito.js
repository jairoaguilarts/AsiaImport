import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

import './Chatcito.css';
import chat from '../../assets/chat.png'; // Asegúrate de que esta ruta sea correcta

function Chatcito() {
    const [chatAbierto, setChatAbierto] = useState(true);
    const [userMessage, setUserMessage] = useState(''); // Estado para manejar el mensaje del usuario

    useEffect(() => {
        console.log('El estado de chatAbierto es ahora:', chatAbierto);
    }, [chatAbierto]);
    // Pasos del chatbot ajustados
    const steps = [
        {
            id: 'inicio',
            message: '¡Hola! ¿En qué puedo ayudarte hoy?',
            trigger: 'opciones',
        },
        {
            id: 'opciones',
            options: [
                { value: 1, label: 'Ver catálogo de productos', trigger: 'catalogo' },
                { value: 2, label: 'Consultar estado de pedido', trigger: 'estadoPedido' },
                { value: 3, label: 'Información sobre envíos', trigger: 'envios' },
                { value: 4, label: 'Política de devoluciones', trigger: 'devoluciones' },
                { value: 5, label: 'Otra consulta', trigger: 'otraConsulta' },
            ],
        },
        {
            id: 'catalogo',
            message: 'Puedes ver nuestro catálogo completo en nuestra página web.',
            trigger: 'finalizarConsulta',
        },
        {
            id: 'estadoPedido',
            message: 'Por favor, proporciona el número de tu pedido.',
            trigger: 'finalizarConsulta',
        },
        {
            id: 'envios',
            message: 'Los envíos se realizan dentro de las 24-48 horas hábiles después de realizar tu pedido.',
            trigger: 'finalizarConsulta',
        },
        {
            id: 'devoluciones',
            message: 'Nuestra política de devolución es de 30 días a partir de la recepción del producto.',
            trigger: 'finalizarConsulta',
        },
        {
            id: 'otraConsulta',
            message: 'Por favor, escribe tu consulta y te responderemos lo antes posible.',
            trigger: 'finalizarConsulta',
        },
        {
            id: 'finalizarConsulta',
            options: [
                { value: 1, label: 'Sí, tengo otra consulta', trigger: 'opciones' },
                { value: 2, label: 'No, gracias', end: true },
            ],
        }
    ];


    const handleSendMessage = (e) => {
        e.preventDefault();
        // Aquí deberías añadir la lógica para enviar el mensaje al ChatBot
        console.log('Mensaje enviado:', userMessage);
        setUserMessage(''); // Limpiar el campo de texto después de enviar
    };

    return (
        <>
            <div className={`chat-container ${chatAbierto ? 'abierto' : ''}`}>
                <img className="chat-button" src={chat} alt="Chat" onClick={() => setChatAbierto(!chatAbierto)} />
                {chatAbierto && (
                    <div className="ventana">
                        <ChatBot key={Date.now()} steps={steps} />
                        <form onSubmit={handleSendMessage} className="input-container">
                            <textarea
                                className="chat-input"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder="Escribe tu mensaje aquí..."
                            />
                            <button type="submit" className="enviar-btn">Enviar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Chatcito;