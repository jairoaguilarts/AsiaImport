// VerFav.js
import React, { useState, useEffect } from "react";
import "./ProductoFiltro.css";  // Asegúrate de tener el archivo de estilos correspondiente
import originIcon from "../../assets/maneki-neko.png";

const VerFav = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAgregar = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar,
      cantidad: "1",
    };

    try {
      const response = await fetch('https://importasia-api.onrender.com/agregarCarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      alert("Producto agregado al carrito")
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const handleEliminar = async (modelo) => {
    const firebaseUID = localStorage.getItem("FireBaseUID");

    try {
      const response = await fetch(`https://importasia-api.onrender.com/eliminarDeFavoritos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ firebaseUID, Modelo: modelo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const nuevosProductos = productos.filter(producto => producto.Modelo !== modelo);
      setProductos(nuevosProductos);
      alert("Producto eliminado de Favoritos");
    } catch (error) {
      console.log('Error al eliminar el producto del carrito: ', error);
      alert("Error al eliminar el producto");
    }
  };


  useEffect(() => {
    const fetchFavoritos = async () => {
      const firebaseUID = localStorage.getItem("FireBaseUID");

      if (firebaseUID !== null) {
        try {
          const response = await fetch(`https://importasia-api.onrender.com/obtenerFavoritos/${firebaseUID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || response.status}`);
          }
          const data = await response.json();
          setProductos(data);
          setLoading(false);
        } catch (error) {
          console.log('Error al obtener los productos favoritos: ', error);
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
          {productos.map((producto, index) => (
            <div className="product-container" key={index}>
              {/* Puedes ajustar el contenido según tus necesidades */}
              <button
                className="product-image-btn"
                onClick={() => {/* Acción al hacer clic en la imagen del producto */ }}
              >
                <img src={producto.ImagenID[0]} alt={producto.Nombre} />
              </button>
              <div className="product-details">
                <h3>{producto.Nombre}</h3>
                <p>Modelo: {producto.Modelo}</p>
                <p>{producto.Descripcion}</p>
                <p className="price">L.{producto.Precio}</p>
                <button className="btn-add-to-cart" onClick={() => handleAgregar(producto.Modelo)}>AÑADIR AL CARRITO  </button>
                <button className="btn-add-to-favorites" onClick={() => handleEliminar(producto.Modelo)}>ELIMINAR DE FAVORITOS </button>
                { /*  <button className="btn-add-to-cart" onClick={() => handleEliminar(product.Modelo)}>Eliminar de Favoritos </button>*/}
                {/* Agrega botones u opciones adicionales según tus necesidades */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerFav;
