import React, { useState } from 'react';
import axios from 'axios';
import Error from './Error'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';


function AgregarProducto({ history, guardarRecargarProductos }) {

    const [nombrePlatillo, guardarNombre] = useState('');
    const [precioPlatillo, guardarPrecio] = useState('');
    const [categoria, guardarCategoria] = useState('');
    const [error, guardarError] = useState(false);

    const leerValorRadio = e => {
        guardarCategoria(e.target.value)
    }


    //onsubmit del frm
    const agregarProducto = async e => {
        e.preventDefault();

        if (nombrePlatillo === '' || precioPlatillo === '' || categoria === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //crear producto
        try {
            const resultado = await axios.post('http://localhost:4000/restaurant', {
                nombrePlatillo,
                precioPlatillo,
                categoria
            });
            if (resultado.status === 201) {
                Swal.fire(
                    'Producto Creado',
                    'El producto se creo correctamente!',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Algo salió mal!',
                text: 'Hubo un error, NO se agregó el producto!'

            })
        }

        //recargar products
        guardarRecargarProductos(true);
        //redirigir a productos
        history.push('/productos');
    }


    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>


            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e => guardarPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Postre
                    </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Bebida
                    </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Cortes
                    </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Ensalada
                    </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    )
}

export default withRouter(AgregarProducto);