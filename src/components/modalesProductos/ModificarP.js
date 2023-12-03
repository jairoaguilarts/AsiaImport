import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../Informative_screens/CustomAlert";

import "./ModificarP.css";

function ModificarP() {
  const navigate = useNavigate();

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const [imagenes, setImagenes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [precio, setPrecio] = useState("");

  const validarDatos = () => {
    const regexId = /^\d+$/;

    if (!regexId.test(precio) || !regexId.test(cantidad)) {
      mostrarAlerta(
        "Datos incorrectos en precio y cantidad. Solo se permiten números.",
        "danger"
      );
      return false;
    }

    return true;
  };
  const modelo = localStorage.getItem("Modelo");

  const handleCancel = () => {
    localStorage.removeItem("Modelo");
    navigate("/gestionpw");
  };

  const handleSave = async () => {
    if (!validarDatos()) {
      return;
    }

    const formData = new FormData();
    formData.append('Descripcion', descripcion);
    formData.append('Caracteristicas', caracteristicas);
    formData.append('Precio', precio);
    formData.append('Cantidad', cantidad);

    if (selectedFile) {
      formData.append('uploadedFile', selectedFile);
    }

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/modificarProducto?Modelo=" + modelo,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta("Producto modificado con exito", "success");
        navigate("/gestionpw");
      } else {
        mostrarAlerta("Error al modificar producto: " + data.error, "danger");
      }
    } catch (error) {
      mostrarAlerta("Ocurrio un error", "danger");
      console.log(error);
    }
  };

  const handleImagenesChange = (e) => {
    const files = e.target.files;
    const nuevasImagenes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      nuevasImagenes.push(URL.createObjectURL(file));
    }

    setImagenes(nuevasImagenes);

    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };


  return (
    <div className="modificar-producto">
      <button className="btn-regresar" onClick={handleCancel}>
        Regresar
      </button>
      <h2>Modificar Producto</h2>
      <div className="form-group">
        <label>Descripción*</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Características*</label>
        <textarea
          value={caracteristicas}
          onChange={(e) => setCaracteristicas(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Imágenes</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagenesChange}
        />
        <div className="imagenes-preview">
          {imagenes.map((imagen, index) => (
            <img key={index} src={imagen} alt={`Imagen ${index}`} />
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Precio*</label>
        <input
          type="text"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Cantidad*</label>
        <input
          type="text"
          id="cantidadProducto"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>
      {showAlert && (
        <CustomAlert
          className="alerta"
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="buttons">
        <button className="btn-cancelar" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="btn-modificar" onClick={handleSave}>
          Modificar Producto
        </button>
      </div>
    </div>
  );
}

export default ModificarP;
