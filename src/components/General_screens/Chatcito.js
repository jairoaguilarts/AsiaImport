import React, { useState, useEffect } from "react";

import "./Chatcito.css";
import chat from "../../assets/chat.png";
import enviar from "../../assets/send.png";

function Chatcito() {
    const [chatAbierto, setChatAbierto] = useState('False');
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    const toggleChat = () => {
        setChatAbierto(!chatAbierto);
    };

    const handleMensajeInput = (event) => {
        setMensaje(event.target.value);
    };
    const handleMensajeEnviado = () => {
        console.log("Mensaje Enviado");
        setMensajes([...mensajes, mensaje]);
        setMensaje("");
    }

    return (
        <div className={`chat-container ${chatAbierto ? 'abierto' : ''}`}>
            <img className="chat-button" src={chat}
                alt="Chat" onClick={toggleChat} />
            {chatAbierto && (
                <div className="ventana">
                    <div className="mensajes">
                        {mensajes.map((msg, index) => (
                            <div key={index}>
                                {msg}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <textarea className="chat-input"
                            placeholder="Escribe tu consulta..."
                            value={mensaje}
                            onChange={handleMensajeInput}
                        />
                        <img
                            className="enviar"
                            src={enviar}
                            alt="Enviar"
                            onClick={handleMensajeEnviado}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatcito;