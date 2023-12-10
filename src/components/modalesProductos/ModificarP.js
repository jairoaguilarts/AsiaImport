import React, { useState, useEffect } from "react";
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

  const [prodAModificar, setProdAModificar] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [precio, setPrecio] = useState("");

  const modelo = localStorage.getItem("Modelo");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://importasia-api.onrender.com/buscarProductoModelo?Modelo=${modelo}`
        );
        const data = await response.json();
        if (!response.ok) {
          mostrarAlerta("El producto no ha sido encontrado", "danger");
        }

        setProdAModificar(data);
        setCantidad(data.Cantidad);
        setDescripcion(data.Descripcion);
        setCaracteristicas(data.Caracteristicas);
        setPrecio(data.Precio);

      } catch (error) {
        mostrarAlerta("Error al extraer el producto", "danger");
      }
    };

    fetchProduct();

  }, []);

  const validarDatos = () => {
    const regexNumData = /^[\d.]+$/;
    const regexStrData = /^$/;

    if (regexStrData.test(precio) && regexStrData.test(cantidad)) {
      mostrarAlerta("Los campos de Precio y Cantidad no deben de estar vacios",
        "danger");
      return false;

    } else if (!regexNumData.test(precio) && !regexNumData.test(cantidad)) {
      mostrarAlerta(
        "Datos incorrectos en precio y cantidad. Solo se permiten números.",
        "danger"
      );
      return false;
    } else if (!regexNumData.test(precio)) {
      mostrarAlerta("Datos incorrectos en Precio", "danger");
      return false;
    } else if (!regexNumData.test(cantidad)) {
      mostrarAlerta("Datos incorrectos en Cantidad", "danger");
      return false;
    }

    if (regexStrData.test(descripcion) && regexStrData.test(caracteristicas)) {
      mostrarAlerta("Ambos campos de Descripcion y Caracteristicas deben de contener datos",
        "danger");
      return false;
    } else if (regexStrData.test(descripcion)) {
      mostrarAlerta("El campo de Descripcion debe de tener datos", "danger");
      return false;
    } else if (regexStrData.test(caracteristicas)) {
      mostrarAlerta("El campo de Caracteristicas deber de tener datos", "danger");
      return false;
    }

    return true;
  };

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
    } else {
      formData.append('uploadedFile', prodAModificar.ImagenID);
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

    if (files.length > 0) {
      const nuevasImagenes = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        nuevasImagenes.push(URL.createObjectURL(file));
      }

      setImagenes(nuevasImagenes);
      setSelectedFile(files[0]);

    } else if (prodAModificar && prodAModificar.ImagenID) {
      setImagenes([prodAModificar.ImagenID]);
    }
  };


  return (
    <div className="modificar-producto">
      <button className="btn-regresar" onClick={handleCancel}>
        Regresar
      </button>
      {prodAModificar && (
        <div className="header">
          <h2>Modificar Producto</h2>
          <span className="nombre-italico">[{prodAModificar.Nombre}]</span>
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Descripción*</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Características*</label>
          <textarea
            value={caracteristicas}
            onChange={(e) => setCaracteristicas(e.target.value)}
          ></textarea>
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Imagen Actual</label>
          <div className="imagenes-preview">
            <img src={prodAModificar.ImagenID} alt="Imagen Actual/Anterior" />
          </div>
        </div>
      )}
      {prodAModificar && (
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
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Precio*</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Cantidad*</label>
          <input
            type="text"
            id="cantidadProducto"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
      )}
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
