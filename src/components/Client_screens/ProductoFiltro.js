import React, { useState, useEffect } from "react";
import "./ProductoFiltro.css";
import audifonosProduct1 from "../../assets/edifierPlus.png";
import Swal from "sweetalert2";
import audifonosProduct2 from "../../assets/Srhythm.png";
import originIcon from "../../assets/maneki-neko.png";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../Client_screens/Pagination";

const AudifonoFiltro = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [products, setProducts] = useState([]);
  const [sortedAndPaginatedProducts, setSortedAndPaginatedProducts] = useState(
    []
  );

  //logica de paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  //productos para la pagina actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoria = location.state?.categoria;

  const sorts = [
    "Precio: Descendente a Ascendente",
    "Precio: Ascendente a Descendente",
    "Relevancia",
    "El más nuevo",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const terminoBusqueda = categoria.trim();
      const urls = [
        `https://importasia-api.onrender.com/buscarProductoCategoria?Nombre=${terminoBusqueda}`,
        `https://importasia-api.onrender.com/buscarProductoNombre?Nombre=${terminoBusqueda}`,
        `https://importasia-api.onrender.com/buscarProductoModelo?Modelo=${terminoBusqueda}`,
      ];

      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const resultados = await Promise.all(
          responses.map((res) => res.json())
        );

        const productosEncontrados = resultados
          .filter((res) => res.length > 0)
          .flat();

        setTimeout(() => {
          setProducts(productosEncontrados);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria]);

  useEffect(() => {
    let sortedProducts = [...products];

    if (selectedSort === "Precio: Descendente a Ascendente") {
      sortedProducts.sort((a, b) => a.Precio - b.Precio);
    } else if (selectedSort === "Precio: Ascendente a Descendente") {
      sortedProducts.sort((a, b) => b.Precio - a.Precio);
    }

    // Aquí aplicamos la paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = sortedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setSortedAndPaginatedProducts(paginatedProducts);
  }, [selectedSort, products, currentPage]);

  const toggleSelection = (item, list, setList) => {
    const currentIndex = list.indexOf(item);
    const newSelected = [...list];

    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setList(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSort("");
    setSelectedRating([]);
    setSelectedColors([]);
  };

  const navigate = useNavigate();

  const handleSubmit = (modelo) => {
    localStorage.setItem("Modelo", modelo);
    navigate("/info-producto");
  };

  const handleAgregar = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar
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
        text: "Producto agregado exitosamente al carrito.",
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

  const handleAgregarFavoritos = async (modeloAgregar) => {
    const datos = {
      firebaseUID: localStorage.getItem("FireBaseUID"),
      Modelo: modeloAgregar,
    };
  
    try {
      const response = await fetch(
        "https://importasia-api.onrender.com/agregarFavoritos",
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
        icon: 'success',
        title: '¡Agregado a Favoritos!',
        text: 'Producto agregado exitosamente a favoritos.',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el producto a favoritos.',
        confirmButtonText: 'Ok'
      });
      console.log("Error: ", error);
    }
  };
  

  return (
    <div className="main-container">
      {loading ? (
        <div className="noproduct-found">
          <h1>Cargando productos...</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : products.length === 0 ? (
        <div className="noproduct-found">
          <h1>No hay productos que coincidan con la búsqueda</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : (
        <>
          <div className="filter-container">
            <div className="filter-header">
              <h2>Filtros</h2>
              <button onClick={clearAllFilters}>Limpiar Todo</button>
            </div>

            <div className="filter-section">
              <h3>Ordenar por:</h3>
              {sorts.map((sort) => (
                <div
                  key={sort}
                  className={`filter-option ${
                    selectedSort === sort ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort(sort)}
                >
                  <span
                    className={`checkbox ${
                      selectedSort === sort ? "checked" : ""
                    }`}
                  ></span>
                  {sort}
                </div>
              ))}
            </div>
          </div>

          <div className="product-list-container">
            {sortedAndPaginatedProducts.map((product, index) => (
              <div className="product-container" key={index}>
                <button
                  className="product-image-btn"
                  onClick={() => handleSubmit(product.Modelo)}
                >
                  <img src={product.ImagenID[0]} alt={product.Nombre} />
                </button>
                <div className="product-details">
                  <h3>{product.Nombre}</h3>
                  <p>Modelo: {product.Modelo}</p>

                  <p className="price">L {product.Precio}.00</p>
                  <button
                    className="btn-add-to-cart"
                    onClick={() => handleAgregar(product.Modelo)}
                  >
                    AÑADIR AL CARRITO{" "}
                  </button>
                  <button
                    className="btn-add-to-favorites"
                    onClick={() => handleAgregarFavoritos(product.Modelo)}
                  >
                    AGREGAR A FAVORITOS
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default AudifonoFiltro;
