import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import "./Chatcito.css";
import ConsultaEstado from "./ConsultarEstado";
import chatIcon from "../../assets/chat.png"; // Asegúrate de que esta ruta sea correcta

function Chatcito() {
  const [chatAbierto, setChatAbierto] = useState(false);
  const BotonWhatsApp = () => {
    const handleRedirect = () => {
      window.open("https://wa.link/h3avtk", "_blank");
    };

    // Estilos para el botón
    const botonEstilo = {
      backgroundColor: "#fdb254", // Color de fondo
      color: "white", // Color del texto
      padding: "10px 20px", // Espaciado interno
      fontSize: "16px", // Tamaño del texto
      border: "none", // Sin borde
      borderRadius: "20px", // Bordes redondeados
      cursor: "pointer", // Cambiar el cursor a puntero
      textTransform: "uppercase", // Texto en mayúsculas
      fontWeight: "bold", // Negrita
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Sombra suave
    };

    return (
      <div>
        <button style={botonEstilo} onClick={handleRedirect}>
          Contactar por WhatsApp
        </button>
      </div>
    );
  };
  const steps = [
    {
      id: "inicio",
      message: "¡Hola! 👋 ¿En qué puedo asistirte hoy?",
      trigger: "opciones",
    },
    {
      id: "opciones",
      options: [
        {
          value: "catalogo",
          label: "📚 Ver catálogo de productos",
          trigger: "show-catalogo",
        },
        {
          value: "estadoPedido",
          label: "📦 Consultar estado de pedido",
          trigger: "ask-pedido",
        },
        {
          value: "envios",
          label: "🚚 Información sobre envíos",
          trigger: "show-envios",
        },
        {
          value: "devoluciones",
          label: "🔄 Política de devoluciones",
          trigger: "show-devoluciones",
        },
        {
          value: "whatsapp",
          label: "📱Atencion Personalizada",
          trigger: "show-atencion",
        },
        {
          value: "finalizar",
          label: "🔚 Finalizar chat",
          trigger: "despedida",
        },
      ],
    },
    {
      id: "show-catalogo",
      message:
        "Puedes ver nuestro catálogo completo en nuestra página web. Aquí encontrarás todos nuestros productos actuales y sus detalles.",
      trigger: "opciones",
    },
    {
      id: "ask-pedido",
      message:
        "Claro, puedo ayudarte con eso. Por favor, dime el número de tu pedido.",
      trigger: "wait-pedido",
    },
    {
      id: "wait-pedido",
      user: true,
      trigger: "consultar-estado",
    },
    {
      id: "consultar-estado",
      component: <ConsultaEstado />, // Un componente React que realizará la consulta al endpoint
      asMessage: true,
      waitAction: true,
      trigger: "opciones", // Después de mostrar el estado, vuelve al menú de opciones
    },
    {
      id: "show-pedido",
      message: "Déjame revisar eso por ti. Un momento, por favor...",
      trigger: "opciones",
    },
    {
      id: "show-envios",
      message:
        "Realizamos los envíos dentro de las 24-48 horas hábiles tras realizar tu pedido. Si tienes alguna pregunta específica contacta con un agente.",
      trigger: "opciones",
    },
    {
      id: "show-devoluciones",
      message:
        "Nuestra política de devolución permite devolver productos hasta 30 días después de haberlos recibido. Si necesitas más información o asistencia con una devolución, solo pregunta.",
      trigger: "opciones",
    },
    {
      id: "show-atencion",
      component: <BotonWhatsApp />,
      end: true,
    },
    {
      id: "despedida",
      message:
        "¡Ha sido un placer ayudarte! 😊 Si necesitas algo más en el futuro, no dudes en volver a hablar conmigo. ¡Que tengas un excelente día! 🌟",
      end: true,
    },
  ];

  return (
    <>
      <div className={`chat-container ${chatAbierto ? "abierto" : ""}`}>
        <img
          className="chat-button"
          src={chatIcon}
          alt="Chat"
          onClick={() => setChatAbierto(!chatAbierto)}
        />
        {chatAbierto && (
          <div className="ventana">
            <ChatBot
              key={Date.now()}
              steps={steps}
              bubbleStyle={{ backgroundColor: "#02a6fc", color: "#ffffff" }}
              customStyle={{ backgroundColor: "white" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Chatcito;
