// VerFav.js
import React, { useState, useEffect } from "react";
import "./ProductoFiltro.css"; // Asegúrate de tener el archivo de estilos correspondiente
import originIcon from "../../assets/maneki-neko.png";
import Pagination from "../Client_screens/Pagination";
import Swal from "sweetalert2";

const VerFav = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAgregar = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar,
    };

    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarCarrito",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      Swal.fire({
        icon: "success",
        title: "¡Agregado!",
        text: "Producto agregado al carrito",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto al carrito.",
        confirmButtonText: "Ok",
      });
      console.log("Error: ", error);
    }
  };

  const handleEliminar = async (modelo) => {
    const firebaseUID = localStorage.getItem("FireBaseUID");

    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/eliminarDeFavoritos`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firebaseUID, Modelo: modelo }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const nuevosProductos = productos.filter(
        (producto) => producto.Modelo !== modelo
      );
      setProductos(nuevosProductos);
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Producto eliminado de Favoritos",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar el producto de favoritos.",
        confirmButtonText: "Ok",
      });
      console.log("Error al eliminar el producto del carrito: ", error);
    }
  };

  useEffect(() => {
    const fetchFavoritos = async () => {
      const firebaseUID = localStorage.getItem("FireBaseUID");

      if (firebaseUID !== null) {
        try {
          const response = await fetch(
            `https://importasia-api.onrender.com/obtenerFavoritos/${firebaseUID}`,
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
          setProductos(data);
          setLoading(false);
        } catch (error) {
          console.log("Error al obtener los productos favoritos: ", error);
          setLoading(false);
          alert("Error al obtener los productos favoritos");
        }
      } else {
        // Manejar el caso en el que el usuario no ha iniciado sesión
        // Puedes redirigirlo a la página de inicio de sesión o mostrar un mensaje
        console.log("No se ha iniciado sesión");
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div className="main-container2">
      {loading ? (
        <div className="noproduct-found">
          <h1>Cargando productos favoritos...</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : productos.length === 0 ? (
        <div className="noproduct-found">
          <h1>No hay productos favoritos</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : (
        <div className="product-list-container">
          {currentProducts.map((producto, index) => (
            <div className="product-container" key={index}>
              {/* Puedes ajustar el contenido según tus necesidades */}
              <button
                className="product-image-btn"
                onClick={() => {
                  /* Acción al hacer clic en la imagen del producto */
                }}
              >
                <img src={producto.ImagenID[0]} alt={producto.Nombre} />
              </button>
              <div className="product-details">
                <h3>{producto.Nombre}</h3>
                <p>Modelo: {producto.Modelo}</p>
                <div
                  style={{
                    border: "2px solid orange",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // esto centrará el texto horizontalmente
                    width: "100%", // esto asegura que el div tome todo el ancho disponible
                    boxSizing: "border-box", // esto asegura que el padding y el borde estén incluidos en el ancho
                  }}
                >
                  <p style={{ margin: 0, width: "100%", textAlign: "justify" }}>
                    {producto.Descripcion}
                  </p>
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "black",
                    margin: "10px 0",
                  }}
                >
                  <p className="price">L.{producto.Precio}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    className="btn-add-to-cart"
                    onClick={() => handleAgregar(producto.Modelo)}
                  >
                    AÑADIR AL CARRITO{" "}
                  </button>
                  <button
                    className="btn-add-to-favorites"
                    onClick={() => handleEliminar(producto.Modelo)}
                  >
                    ELIMINAR DE FAVORITOS{" "}
                  </button>
                </div>
                <hr></hr>
                {/*  <button className="btn-add-to-cart" onClick={() => handleEliminar(product.Modelo)}>Eliminar de Favoritos </button>*/}
                {/* Agrega botones u opciones adicionales según tus necesidades */}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{ textAlign: "center", padding: "10px 0", marginLeft: "180px" }}
      >
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={productos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default VerFav;
