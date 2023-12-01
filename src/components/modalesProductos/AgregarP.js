import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModificarP.css";
import CustomAlert from "../Informative_screens/CustomAlert.js";

function AgregarP() {
  const navigate = useNavigate();

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const [nombre, setNombre] = useState("");

  const [modelo, setModelo] = useState("");

  const [categoria, setCategoria] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const [caracteristicas, setCaracteristicas] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [alertVariant, setAlertVariant] = useState("white");

  const [cantidad, setCantidad] = useState("");

  const [precio, setPrecio] = useState("");

  const [imagenes, setImagenes] = useState([]);

  const [userType, setUserType] = useState("");
  const handleCancel = () => {
    navigate("/gestionpw");
  };

  const handleSave = async () => {
    setUserType(localStorage.getItem("userType"));
    const cambios = {
      Nombre: nombre,
      Modelo: modelo,
      Categoria: categoria,
      Descripcion: descripcion,
      Caracteristicas: caracteristicas,
      Cantidad: cantidad,
      Precio: precio,
      Imagenes: imagenes,
      userCreatingType: "*",
    };

    try {
      if (
        nombre === "" ||
        modelo === "" ||
        precio === "" ||
        categoria === "" ||
        cantidad === ""
      ) {
        mostrarAlerta("Todos los campos son obligatorios", "danger");
        return;
      }
      const response = await fetch("http://localhost:3000/agregarProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cambios),
      });

      const errorData = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${errorData.message || response.status}`);
      } else {
        mostrarAlerta("Producto agregado correctamente", "success");
      }
      return;
    } catch (error) {
      mostrarAlerta("Error al agregar producto ", "danger");
    }

    console.log(cambios);
  };

  const handleImagenesChange = (e) => {
    const files = e.target.files;
    const nuevasImagenes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      nuevasImagenes.push(URL.createObjectURL(file));
    }
    setImagenes(nuevasImagenes);
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
          onChange={handleImagenesChange}
          id="imagenesProducto"
        />
        <div className="imagenes-preview">
          {imagenes.map((imagen, index) => (
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
