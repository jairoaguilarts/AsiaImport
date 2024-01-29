import React, { useState, useEffect } from "react";
import "./GestionPW.css"; // Asegúrate de ajustar la ruta si es necesario
import CustomAlert from "../Informative_screens/CustomAlert";

const GestionarInfo = () => {
  const [mision, setMision] = useState("");
  const [vision, setVision] = useState("");
  const [historia, setHistoria] = useState("");
  const [contenido, setContenido] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");
  const [showAlert, setShowAlert] = useState(false);
  const [datosViejos, setdatosViejos] = useState("");
  const [politicas, setPoliticas] = useState("");

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const cargarInformacionEmpresa = async () => {
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/obtenerInformacion?id=65768fb8175690a253ab6b95`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();

      // Actualizar los estados con la información obtenida
      if (data) {
        setMision(data.mision);
        setVision(data.vision);
        setHistoria(data.historia);
        setdatosViejos(data);
      }
    } catch (error) {
      mostrarAlerta("Error al cargar la información", "danger");
    }
  };
const handleActualizarInfo = async () => {
    if (
      mision === datosViejos.mision &&
      vision === datosViejos.vision &&
      historia === datosViejos.historia
    ) {
      mostrarAlerta('"No se han realizado cambios para guardar"', "danger");
      return;
    }
    if (mision === "" || vision === "" || historia === "") {
      mostrarAlerta('"No se han completado todos los campos"', "danger");
      return;
    }

    try {
      const data = {
        mision: mision,
        vision: vision,
        historia: historia,
      };

      const response = await fetch(
        "https://importasia-api.onrender.com/editarInformacionEmpresa?id=65768fb8175690a253ab6b95",
        {
          // Incluir el _id aquí
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      mostrarAlerta("Información actualizada exitosamente", "success");
    } catch (error) {
      mostrarAlerta("Error al actualizar la información", "danger");
    }
    window.location.reload();
  };

  const cargarPoliticas = async () => {
    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/politicas"
      );
      if (!response.ok) {
        throw new Error("Error al cargar las políticas");
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setPoliticas(data[0].contenido);
        setContenido(data[0].contenido); // Inicializa el contenido para edición
      }
    } catch (error) {
      console.error("Error al cargar las políticas:", error);
      // Manejo de errores
    }
  };

  const editarContenido = async () => {
    if (contenido.trim() === "") {
      mostrarAlerta("El contenido no puede estar vacío.", "danger");
      return;
    }

    if (contenido === politicas) {
      mostrarAlerta("No hay cambios en el contenido para actualizar.", "info");
      return;
    }

    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/editarPoliticaPrivacidad`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contenido }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        mostrarAlerta(
          `Error: ${errorData.message || response.status}`,
          "danger"
        );
        return;
      }

      const data = await response.json();
      mostrarAlerta(
        "Política de privacidad actualizada correctamente.",
        "success"
      );

      setPoliticas(contenido);

      console.log(data);
    } catch (error) {
      mostrarAlerta("Error al actualizar la política de privacidad.", "danger");
      console.error("Error al actualizar el contenido:", error);
    }
  };

  useEffect(() => {
    cargarInformacionEmpresa();
    cargarPoliticas();
  }, []);

  return (
    <div>
      {/* Sección Editar Información */}
      <div className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Informacion</h1>
        </div>
        <div className="section editar-informacion">
          <div className="editar-informacion-container">
            <div className="editar-informacion-field">
              <label htmlFor="mision">Misión</label>
              <textarea id="mision" value={mision} onChange={(e) => setMision(e.target.value)}></textarea>
              <label htmlFor="vision">Visión</label>
              <textarea id="vision" value={vision} onChange={(e) => setVision(e.target.value)}></textarea>
              <label htmlFor="historia">Historia</label>
              <textarea id="historia" value={historia} onChange={(e) => setHistoria(e.target.value)}></textarea>
              <button className="editar-informacion-btn" onClick={handleActualizarInfo}>Actualizar Información</button>
              {showAlert && (
                <CustomAlert
                  className="alerta"
                  message={alertMessage}
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sección Editar Políticas */}
      <div className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Política de Privacidad</h1>
        </div>
        <div className="section editar-informacion">
          <div className="editar-informacion-container">
            <div className="editar-informacion-field">
              <label htmlFor="politica-contenido">Contenido de la política</label>
              <textarea id="politica-contenido" className="textarea-field" value={contenido} onChange={(e) => setContenido(e.target.value)}></textarea>
              <button className="editar-informacion-btn" onClick={editarContenido}>Actualizar Políticas</button>
              {showAlert && (
                <CustomAlert
                  className="alerta"
                  message={alertMessage}
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionarInfo;
