import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../Informative_screens/CustomAlert';

import './ModificarP.css';

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
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [precio, setPrecio] = useState('');

    const modelo = localStorage.getItem("Modelo");

    const handleCancel = () => {
        localStorage.removeItem("Modelo");
        navigate('/gestionpw');
    };

    const handleSave = async () => {
        const cambios = {
            Descripcion: descripcion,
            Caracteristicas: caracteristicas,
            Precio: precio,
            Cantidad: cantidad,
        };

        try {
            const response = await fetch('http://localhost:3000/modificarProducto?Modelo=' + modelo, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cambios),
            });

            console.log(response);

            const data = await response.json();

            if (response.ok) {
                mostrarAlerta("Producto modificado con exito", "success");
                navigate('/gestionpw');
            } else {
                mostrarAlerta("Error al modificar producto", "danger");
            }
        } catch (error) {
            mostrarAlerta("Ocurrio un error", "danger");
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
                <input type="file" accept="image/*" multiple onChange={handleImagenesChange} />
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
};

export default ModificarP;
