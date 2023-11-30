import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ModificarP.css';

const ModificarP = ({ product, onSave }) => {
    // Estado para las características
    const [caracteristicas, setCaracteristicas] = useState(product?.caracteristicas || '');
    const navigate = useNavigate();

    // Estado para las imágenes
    const [imagenes, setImagenes] = useState([]);
    const handleCancel = () => {
        // Redireccionar al usuario al componente deseado al cancelar
        navigate('/gestionpw'); // Reemplaza '/ruta-deseada' con tu ruta específica
    };
    const handleSave = () => {
        // Lógica para guardar los cambios
        const cambios = {
            nombre: '', // Obtén el valor del campo de nombre
            modelo: '', // Obtén el valor del campo de modelo
            descripcion: '', // Obtén el valor del campo de descripción
            caracteristicas: caracteristicas, // Usa el estado para las características
            precio: '', // Obtén el valor del campo de precio
            imagenes: imagenes, // Usa el estado para las imágenes
        };

        // Llama a la función 'onSave' y pasa los cambios
        onSave(cambios);
    };

    const handleImagenesChange = (e) => {
        // Manejo de cambios en la carga de imágenes
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
            <h2>Modificar Producto</h2>
            <div className="form-group">
                <label>Nombre de Producto*</label>
                <input type="text" placeholder="Srhhythm NiceComfort" />
            </div>
            <div className="form-group">
                <label>Modelo*</label>
                <input type="text" placeholder="IK92L" />
            </div>
            <div className="form-group">
                <label>Descripción*</label>
                <textarea placeholder="Los audífonos inalámbricos WH-CH520, diseñados con la comodidad para..."></textarea>
            </div>
            <div className="form-group">
                <label>Características*</label>
                <textarea
                    //value={caracteristicas}
                    // onChange={(e) => setCaracteristicas(e.target.value)}
                    placeholder="Ejemplo de características: Tamaño: Pequeño, Color: Negro, Peso: 200g"
                ></textarea>
            </div>
            <div className="form-group">
                <label>Imágenes</label>
                <input type="file" accept="image/*" multiple onChange={handleImagenesChange} />
                <div className="imagenes-preview">
                    {imagenes.map((imagen, index) => (
                        <img key={index} src={imagen} alt={`Imagen ${index}`} />
                    ))}
                </div>
            </div>
            <div className="form-group">
                <label>Precio*</label>
                <input type="text" placeholder="L. 2199.00" />
            </div>
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
};

export default ModificarP;
