import React, { useState, useRef, useEffect } from "react";
import "./GestionPW.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import iconEdit from "../../assets/edit .png";
import iconDelete from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/lupa.png";
import estrellaVacia from "../../assets/estrella.png";
import estrellaLlena from "../../assets/estrella-llena.png";
import CustomAlert from "../Informative_screens/CustomAlert";
import ModificarP from "../modalesProductos/ModificarP";
import Pagination from "../Client_screens/Pagination";

const GestionPW = () => {
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searched, setSearched] = useState(false);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [contenido, setContenido] = useState("");
  const [id, setId] = useState("");

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  //logica de paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  //productos para la pagina actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!searched) {
      fetch("https://importasia-api.onrender.com/productosP")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);

          // Inicializa el estado de los checkboxes y productos destacados
          const newSelectedProducts = {};
          const initialProductosDestacados = [];
          data.forEach((product) => {
            newSelectedProducts[product.Modelo] = product.Destacado;

            if (product.Destacado) {
              initialProductosDestacados.push(product.Modelo);
            }
          });

          setSelectedProducts(newSelectedProducts);
          setProductosDestacados(initialProductosDestacados);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [searched]);
<<<<<<< HEAD
=======

>>>>>>> 518bb096387c6883b73b8f0013462890307a219d

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const [datosViejos, setdatosViejos] = useState("");
  const nuestrosProductosRef = useRef(null);
  const editarProductosDestacadosRef = useRef(null);
  const editarImagenesCarrouselRef = useRef(null);
  const editarInformacionRef = useRef(null);
  const [showModalModificarP, setShowModalModificarP] = useState(false);
  const [modalState, setModalState] = useState({
    showModal: false,
    productToEdit: null,
  });
  const [busqueda, setBusqueda] = useState("");

  const handleShowModalModificarP = (product) => {
    setModalState({ showModal: true, productToEdit: product });
  };

  const userType = localStorage.getItem("userType");

  const handleCloseModalModificarP = () => {
    setModalState({ showModal: false, productToEdit: null });
  };

  const toggleModal = () => {
    setShowModalModificarP(!showModalModificarP);
  };

  const handleModelSubmit = (Modelo) => {
    localStorage.setItem("Modelo", Modelo);
  };

  const handleShowEliminarConfirmar = (Modelo) => {
    setProductoSeleccionado(Modelo);
    setShowEliminarConfirmar(true);
  };

  const handleCloseEliminarConfirmar = () => {
    setShowEliminarConfirmar(false);
  };

  const handleEliminar = async () => {
    if (!productoSeleccionado) {
      mostrarAlerta("No se ha seleccionado ningun producto", "danger");
      return;
    }
    const datoEliminar = {
      userDeletingType: userType,
    };
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/eliminarProducto?Modelo=${productoSeleccionado}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datoEliminar),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      mostrarAlerta("Producto eliminado exitosamente", "info");
      setProducts(
        products.filter((product) => product.Modelo !== productoSeleccionado)
      );
    } catch (error) {
      mostrarAlerta("Error al eliminar el Producto", "danger");
    }

    setShowEliminarConfirmar(false);
    setProductoSeleccionado(null);
  };

  const scrollToSection = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const handleActualizar = () => { };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    console.log("Imagen para subir:", file);
  };
  const sinonimos = {
    audífonos: "AURICULARES",
    audifonos: "AURICULARES",
    audifono: "AURICULARES",
    audífono: "AURICULARES",
    cascos: "AURICULARES",
    auricular: "AURICULARES",
    termo: "BOTES",
    termos: "BOTES",
    bote: "BOTES",
    botellas: "BOTES",
    cargador: "CARGADORES",
    protector: "COBERTORES",
    protectores: "COBERTORES",
    cobertor: "COBERTORES",
    vidrio: "VIDRIO TEMPLADO",
    vidrios: "VIDRIO TEMPLADO",
    "vidrio templado": "VIDRIO TEMPLADO",
    parlante: "PARLANTE",
    altavoz: "PARLANTE",
    altavoces: "PARLANTE",
    bocina: "PARLANTE",
    bocinas: "PARLANTE",
    radio: "PARLANTE",
    radios: "PARLANTE",
    reloj: "SMARTWATCH",
    relojes: "SMARTWATCH",
    "relojes inteligentes": "SMARTWATCH",
    smartwatches: "SMARTWATCH",
  };

  const buscarConSinonimos = (termino) => {
    const palabraSinonimo = sinonimos[termino.toLowerCase()];
    return palabraSinonimo || termino;
  };

  const handleSearch = async () => {
    if (busqueda.trim() === "") {
      mostrarAlerta("No se ingresó ningún término de búsqueda", "danger");
      return;
    }

    const terminoBusqueda = buscarConSinonimos(busqueda.trim());
    const urls = [
      `https://importasia-api.onrender.com/buscarProductoCategoria?Nombre=${terminoBusqueda}`,
      `https://importasia-api.onrender.com/buscarProductoNombre?Nombre=${terminoBusqueda}`,
      `https://importasia-api.onrender.com/buscarProductoModelo?Modelo=${terminoBusqueda}`,
    ];

    try {
      setProducts([]); // Limpia la lista de productos

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const resultados = await Promise.all(responses.map((res) => res.json()));

      const productosEncontrados = resultados
        .filter((res) => res.length > 0)
        .flat();

      if (productosEncontrados.length === 0) {
        mostrarAlerta("No se encontraron productos", "danger");
      } else {
        mostrarAlerta("Productos encontrados", "success");
        setSearched(true);

        // Restablecer currentPage a 1 para mostrar los resultados de búsqueda desde el principio
        setCurrentPage(1);

        // Actualiza los productos con los resultados de búsqueda
        setProducts(productosEncontrados);
      }
    } catch (error) {
      mostrarAlerta("Error en la búsqueda", "danger");
    }
  };

  const [mision, setMision] = useState("");
  const [vision, setVision] = useState("");
  const [historia, setHistoria] = useState("");
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
      console.log(data);

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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = async (modelo) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [modelo]: !prevState[modelo],
    }));

    if (productosDestacados.includes(modelo)) {
      await fetch("http://localhost:3000/destacarProducto?Modelo=" + modelo, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Destacado: false }),
      });

<<<<<<< HEAD
      setProductosDestacados((prev) => prev.filter((prod) => prod !== modelo));
=======
      setProductosDestacados(prev => prev.filter(prod => prod !== modelo));
>>>>>>> 518bb096387c6883b73b8f0013462890307a219d
    } else {
      setProductosDestacados((prev) => [...prev, modelo].slice(0, 8));
    }
  };

<<<<<<< HEAD
=======

>>>>>>> 518bb096387c6883b73b8f0013462890307a219d
  const [selectedProducts, setSelectedProducts] = useState({});
  const handleActualizar2 = async () => {
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

  const handleDestacado = async () => {
    try {
      const requests = productosDestacados.map((Modelo) => {
        return fetch(
          "http://localhost:3000/destacarProducto?Modelo=" + Modelo,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Destacado: true }),
          }
        );
      });

      await Promise.all(requests);
      mostrarAlerta("Productos destacados actualizados", "success");
    } catch (error) {
      mostrarAlerta("Error al actualizar productos destacados", "danger");
    }
  };

<<<<<<< HEAD
=======
  const [imagenes, setImagenes] = useState([]);
  const handleActualizarImagenesCarrusel = async () => {
    try {
      if (imagenes.length === 0) {
        mostrarAlerta("No se han seleccionado imágenes para subir", "danger");
        return;
      }

      const formData = new FormData();
      imagenes.forEach(imagen => {
        formData.append(`uploadFile`, imagen);
      });

      const response = await fetch("http://localhost:3001/agregarImgCarruselInicio", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const Data = await response.json();
        if (Data.success) {
          mostrarAlerta("Imágenes del carrusel actualizadas correctamente", "success");
        } else {
          mostrarAlerta("Error al actualizar imágenes del carrusel", "danger");
        }
      } else {
        mostrarAlerta("Error al Obtener respuesta del servidor", "danger");
      }
    } catch (error) {
      mostrarAlerta("No se pudieron agregar las imagenes", "danger");
    }
  };

  const obtenerCarrusel = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/obtenerCarruselInicio`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Aqui hay un error", errorData);
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.text();
      console.log("Adentro del try 4");
      console.log("Elementos detro de data: ", data);

    } catch (error) {
      console.log("Adentro del catch " + error.message);
      mostrarAlerta("Problema al mostrar las imagenes", "danger");
    }
  };


>>>>>>> 518bb096387c6883b73b8f0013462890307a219d
  useEffect(() => {
    cargarInformacionEmpresa();
    obtenerCarrusel();
  }, []);

  const editarContenido = async () => {
    if (contenido.trim() === "") {
      mostrarAlerta("El contenido no puede estar vacío.", "danger");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/editarPoliticaPrivacidad`,
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
      console.log(data);

      // Aquí es donde estableces el estado 'contenido' a una cadena vacía para borrar el área de texto
      setContenido("");
    } catch (error) {
      mostrarAlerta("Error al actualizar la política de privacidad.", "danger");
      console.error("Error al actualizar el contenido:", error);
    }
  };

  return (
    <div className="gestion-wrapper">
      {/* Barra de navegación */}
      <div className="navbar2">
        <button onClick={() => scrollToSection(nuestrosProductosRef)}>
          Nuestros Productos
        </button>
        <button onClick={() => scrollToSection(editarProductosDestacadosRef)}>
          Editar Productos Destacados
        </button>
        <button onClick={() => scrollToSection(editarImagenesCarrouselRef)}>
          Editar Imágenes Carrousel
        </button>
        <button onClick={() => scrollToSection(editarInformacionRef)}>
          Editar Información
        </button>
      </div>
      <div className="tabla-productos">
        {/* Sección Nuestros Productos */}
        <div ref={nuestrosProductosRef} className="section">
          <div className="title-bar"></div>
          <div className="editar-informacion-title">
            <h1 className="title">Nuestros Productos</h1>
          </div>
          <div className="gestion-container">
            <div className="top-bar">
              <Link to="/agregarp">
                <button className="add-product-btn">
                  Crear Nuevo Producto
                </button>
              </Link>
              <button className="add-product-btn" onClick={handleDestacado}>
                Actualizar Productos Destacados
              </button>
              <div className="search-container2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="search-bar2"
                  id="barraBuscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="add-product-btn" onClick={handleSearch}>
                  <img src={searchIcon} alt="Buscar" className="icon" />
                </button>
              </div>
              {showAlert && (
                <CustomAlert
                  className="alerta"
                  message={alertMessage}
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>
            <div className="product-table">
              <div className="product-row header">
                <span>Modelo</span>
                <span>Categoría</span>
                <span>Nombre</span>
                <span>Descripción</span>
                <span>Imagen</span>
                <span>Editar</span>
              </div>
              {currentProducts.map((product) => (
                <div className="product-row" key={product.Modelo}>
                  <span className="product-model">{product.Modelo}</span>
                  <span className="product-category">{product.Categoria}</span>
                  <span className="product-name">{product.Nombre}</span>
                  <span className="product-description">
                    {product.Descripcion}
                  </span>
                  <img
                    src={product.ImagenID[0]}
                    alt="Product"
                    className="product-image"
                  />
                  <div className="product-actions">
                    <Link to="/modificarp">
                      <button
                        className="edit-btn"
                        aria-label="Edit"
                        onClick={() => handleModelSubmit(product.Modelo)}
                      >
                        <img src={iconEdit} alt="Edit" />
                      </button>
                    </Link>
                    <button
                      className="delete-btn"
                      aria-label="Delete"
                      onClick={() =>
                        handleShowEliminarConfirmar(product.Modelo)
                      }
                    >
                      <img src={iconDelete} alt="Delete" />
                    </button>
                    <label className="delete-btn">
                      <input
                        type="checkbox"
                        checked={selectedProducts[product.Modelo]}
                        onChange={() => handleCheckboxChange(product.Modelo)}
                        style={{ display: "none" }}
                      />
                      <img
                        src={
                          selectedProducts[product.Modelo]
                            ? estrellaLlena
                            : estrellaVacia
                        }
                        alt={
                          selectedProducts[product.Modelo]
                            ? "Estrella llena"
                            : "Estrella vacía"
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Sección Editar Productos Destacados */}
      {/* <div ref={editarProductosDestacadosRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Productos Destacados</h1>
        </div>
      </div> */}

      {/* Sección Editar Imágenes Carrousel */}
      <div ref={editarImagenesCarrouselRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Imágenes del Carrusel</h1>
        </div>
        <div className="editar-imagenes-carrousel-container">
          <div className="current-images-container">
            <h2>Imágenes Actuales</h2>
            {imagenes && (
              <div className="current-images-display">
                {
                  imagenes.map((imagen, index) => (
                    <img key={index} src={imagen} alt={`Imagen ${index}`} />
                  ))
                }
              </div>
            )}
          </div>
          <div className="image-upload-container">
            <h2>Subir Nueva Imagen</h2>

            <input type="file"
              multiple
              onChange={(e) => setImagenes(Array.from(e.target.files))}
            />
            <p>
              Selecciona una o varias imágenes y luego haz clic en 'Actualizar
              Imágenes' para subir.
            </p>
            <button className="editar-informacion-btn" onClick={handleActualizarImagenesCarrusel}>
              Actualizar Imágenes
            </button>
          </div>
        </div>
      </div>

      {/* Sección Editar Información */}
      <div ref={editarInformacionRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Informacion</h1>
        </div>
        <div ref={editarInformacionRef} className="section editar-informacion">
          <div className="editar-informacion-container">
            <div className="editar-informacion-field">
              <label htmlFor="mision">Misión</label>
              <textarea
                id="mision"
                value={mision}
                onChange={(e) => setMision(e.target.value)}
              ></textarea>
              <label htmlFor="mision">Vision</label>
              <textarea
                id="vision"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              ></textarea>
              <label htmlFor="mision">Historia</label>
              <textarea
                id="historia"
                value={historia}
                onChange={(e) => setHistoria(e.target.value)}
              ></textarea>
              <button
                className="editar-informacion-btn"
                onClick={handleActualizar2}
              >
                Actualizar Información
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECCION EDITAR POLITICAS */}
      <div ref={editarInformacionRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Política de Privacidad</h1>
        </div>
        <div ref={editarInformacionRef} className="section editar-informacion">
          <div className="editar-informacion-container">
            <div className="editar-informacion-field">
              <label htmlFor="politica-contenido">
                Contenido de la política
              </label>
              <textarea
                id="politica-contenido"
                className="textarea-field"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
              ></textarea>
              <button
                className="editar-informacion-btn"
                onClick={editarContenido}
              >
                Actualizar Politicas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para confirmación de eliminación */}
      <Modal
        className="modal-confirmar"
        show={showEliminarConfirmar}
        onHide={handleCloseEliminarConfirmar}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEliminarConfirmar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionPW;
