import React, { useState } from "react";
import CustomAlert from "../Informative_screens/CustomAlert";
import { useNavigate } from "react-router-dom";

import "./ModificarP.css";

function AgregarP() {
  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenes, setImagenes] = useState({ previews: [], files: [] });
  const userType = localStorage.getItem("userType");
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const validarDatos = () => {
    const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    const regexId = /^\d+$/;

    if (
      !regexNombreApellido.test(nombre) ||
      !regexNombreApellido.test(categoria)
    ) {
      mostrarAlerta(
        "Datos incorrectos en nombre o categoria. Solo se permiten letras.",
        "danger"
      );
      return false;
    }

    if (!regexId.test(precio) || !regexId.test(cantidad)) {
      mostrarAlerta(
        "Datos incorrectos en precio y cantidad. Solo se permiten números.",
        "danger"
      );
      return false;
    }

    return true;
  };
  const onFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filesArray = files.map((file) => URL.createObjectURL(file));

    imagenes.previews.forEach((imagen) => URL.revokeObjectURL(imagen));
    setImagenes({ previews: filesArray, files: files });
  };

  const handleCancel = () => {
    navigate("/gestionpw");
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Modelo", modelo);
    formData.append("Categoria", categoria);
    formData.append("Descripcion", descripcion);
    formData.append("Caracteristicas", caracteristicas);
    formData.append("Cantidad", cantidad);
    formData.append("Precio", precio);
    formData.append("userCreatingType", userType);

    imagenes.files.forEach((file) => {
      formData.append("uploadedFile", file);
    });

    if (
      nombre === "" ||
      modelo === "" ||
      precio === "" ||
      categoria === "" ||
      cantidad === ""
    ) {
      mostrarAlerta(
        "Los campos: Nombre,Categoria,Modelo,Cantidad y Precio son obligatorios",
        "danger"
      );
      return;
    }
    if (!validarDatos()) {
      return;
    }

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarProducto",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || response.status}`);
        } else {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }
      }

      mostrarAlerta("Producto agregado correctamente", "success");
      navigate("/gestionpw");
    } catch (error) {
      mostrarAlerta(`Error al agregar producto: ${error.message}`, "danger");
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="modificar-producto">
      <button className="btn-regresar" onClick={handleCancel}>
        Regresar
      </button>
      <h2>Agregar Producto</h2>
      <div className="form-group">
        <label>Nombre de Producto</label>
        <input
          type="text"
          placeholder=""
          id="nombreProducto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Modelo</label>
        <input
          type="text"
          placeholder=""
          id="modeloProducto"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Categoria</label>
        <input
          type="text"
          placeholder=""
          id="categoriaProducto"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          placeholder=""
          id="descripcionProducto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Características</label>
        <textarea
          placeholder=""
          id="caracteristicasProducto"
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
          id="imagenesProducto"
          onChange={onFileChange}
        />
        <div className="imagenes-preview">
          {imagenes.previews.map((imagen, index) => (
            <img key={index} src={imagen} alt={`Imagen ${index}`} />
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Cantidad</label>
        <input
          type="text"
          placeholder=""
          id="cantidadProducto"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input
          type="text"
          placeholder=""
          id="precioProducto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
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
          Agregar Producto
        </button>
      </div>
    </div>
  );
}

export default AgregarP;
