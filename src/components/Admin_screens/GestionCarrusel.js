import React, { useState, useRef } from "react";
import "./GestionPW.css";
const GestionCarrusel = () => {
  const editarImagenesCarrouselRef = useRef(null);

  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const inputFileRef = useRef(null);

  const mostrarAlerta = (mensaje, tipo) => {
    // Implementa tu lógica para mostrar alertas aquí
    console.log(`${tipo}: ${mensaje}`);
  };

  const handleActualizarImagenesCarrusel = async () => {
    try {
      if (imagenes.length === 0) {
        mostrarAlerta("No se han seleccionado imágenes para subir", "danger");
        return;
      }

      const formData = new FormData();
      imagenes.forEach((imagen) => {
        formData.append(`uploadedFile`, imagen);
      });

      const response = await fetch(
        "https://importasia-api.onrender.com/agregarImgCarruselInicio",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const Data = await response.json();
        if (Data.success) {
          obtenerCarrusel();
          if (inputFileRef.current) {
            inputFileRef.current.value = "";
          }
          mostrarAlerta(
            "Imágenes del carrusel actualizadas correctamente",
            "success"
          );
        } else {
          mostrarAlerta("Error al actualizar imágenes del carrusel", "danger");
        }
      } else {
        mostrarAlerta("Error al obtener respuesta del servidor", "danger");
      }
    } catch (error) {
      mostrarAlerta(`No se pudieron agregar las imágenes: ${error.message}`, "danger");
    }
  };

  const obtenerCarrusel = async () => {
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/obtenerCarruselInicio`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al obtener carrusel", errorData);
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      setImagenes(data[0].imagenID);
    } catch (error) {
      console.log("Problema al mostrar las imágenes: " + error.message);
      mostrarAlerta("Problema al mostrar las imágenes", "danger");
    }
  };

  const eliminarImagenCarrusel = async () => {
    try {
      if (!imagenSeleccionada) {
        mostrarAlerta(
          "No se ha seleccionado ninguna imagen para eliminar",
          "danger"
        );
        return;
      }

      const response = await fetch(
        "https://importasia-api.onrender.com/eliminarImgCarruselInicio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: imagenSeleccionada }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al eliminar imagen: ${errorData.message || response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        mostrarAlerta(
          "Imagen del carrusel eliminada correctamente",
          "success"
        );
        obtenerCarrusel();
        setImagenSeleccionada(null);
      } else {
        mostrarAlerta(
          "Error al cargar la imagen en formato JSON",
          "danger"
        );
      }
    } catch (error) {
      mostrarAlerta("Error al eliminar la imagen del carrusel", "danger");
    }
  };

  const handleImagenSeleccionada = (imagen) => {
    setImagenSeleccionada(imagen);
  };

  const hanldeSeleccionArchivos = (e) => {
    const archivo = Array.from(e.target.files);
    setImagenes((imagenesPrevias) => [...imagenesPrevias, ...archivo]);
  };

  return (
    <div ref={editarImagenesCarrouselRef} className="section">
      <div className="editar-informacion-title">
        <h1 className="title">Editar Imágenes del Carrusel</h1>
      </div>
      <div className="editar-imagenes-carrousel-container">
        <div className="current-images-container">
          <h2>Imágenes Actuales</h2>
          {imagenes && (
            <div className="current-images-display">
              {imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`Imagen ${index}`}
                  onClick={() => handleImagenSeleccionada(imagen)}
                  className={imagen === imagenSeleccionada ? "selected" : ""}
                />
              ))}
            </div>
          )}
        </div>
        <div className="image-upload-container">
          <h2>Gestionar Imágenes</h2>

          <input
            type="file"
            ref={inputFileRef}
            multiple
            onChange={hanldeSeleccionArchivos}
          />
          <p>
            Selecciona una o varias imágenes y luego haz clic en 'Actualizar
            Imágenes' para subir.
          </p>
          <button
            className="editar-informacion-btn"
            onClick={handleActualizarImagenesCarrusel}
          >
            Actualizar Carrusel
          </button>
          <button
            className="eliminar-img-btn"
            onClick={eliminarImagenCarrusel}
          >
            Eliminar Imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionCarrusel;
