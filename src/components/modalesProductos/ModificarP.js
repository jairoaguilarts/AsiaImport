import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../Informative_screens/CustomAlert";
import Select from "react-select";

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
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [precio, setPrecio] = useState("");
  const options = [
    { value: "PARLANTE", label: "PARLANTE" },
    { value: "AURICULARES", label: "AURICULARES" },
    { value: "BOTES", label: "BOTES" },
    { value: "CARGADORES", label: "CARGADORES" },
    { value: "SMARTWATCH", label: "SMARTWATCH" },
    { value: "VIDRIO TEMPLADO", label: "VIDRIO TEMPLADO" },
    { value: "COBERTORES", label: "COBERTORES" },
    { value: "OTROS", label: "OTROS" },
  ];

  const handleCategoriaChange = (selectedOption) => {
    setCategoria(selectedOption.value);
  };

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
        setNombre(data.Nombre);
        setCategoria(data.Categoria);
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

    if (regexStrData.test(nombre)) {
      mostrarAlerta("Ingrese un nombre para el producto.", "danger");
      return false;
    }
    if (regexStrData.test(categoria)) {
      mostrarAlerta("Seleccione una categoría para el producto.", "danger");
      return false;
    }
    if (regexStrData.test(precio)) {
      mostrarAlerta("El precio no debe estar vacio.", "danger");
      return false;
    }
    if (regexStrData.test(cantidad)) {
      mostrarAlerta("La cantidad no debe estar vacia.", "danger");
      return false;
    }
    if (!regexNumData.test(precio)) {
      mostrarAlerta("Datos incorrectos en precio.", "danger");
      return false;
    } else if (!regexNumData.test(cantidad)) {
      mostrarAlerta("Datos incorrectos en cantidad.", "danger");
      return false;
    }
    if (regexStrData.test(descripcion)) {
      mostrarAlerta("La descripcion no debe estar vacia.", "danger");
      return false;
    }
    if (regexStrData.test(caracteristicas)) {
      mostrarAlerta("Las caracteristicas deben tener datos.", "danger");
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
    formData.append("Nombre", nombre);
    formData.append("Categoria", categoria);
    formData.append("Descripcion", descripcion);
    formData.append("Caracteristicas", caracteristicas);
    formData.append("Precio", precio);
    formData.append("Cantidad", cantidad);

    if (selectedFile) {
      formData.append("fileSelected", "yes");
      formData.append("uploadedFile", selectedFile);
    } else {
    }

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/modificarProducto?Modelo=" +
          modelo,
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
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Modelo</label>
          <input
            type="text"
            contentEditable={false}
            value={prodAModificar.Modelo}
          />
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <form>
            <label>Categoria</label>
            <Select
              name="categoria"
              value={options.find((opt) => opt.value === categoria)}
              onChange={handleCategoriaChange}
              options={options}
              isSearchable
              placeholder="Seleccione una opcion"
              className="select-with-scroll"
            />
          </form>
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Características</label>
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
          <label>Precio</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
      )}
      {prodAModificar && (
        <div className="form-group">
          <label>Cantidad</label>
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
