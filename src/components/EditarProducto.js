import React, { useState, useRef } from 'react';
import Error from './Error'
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditarProducto(props) {

    //destructuring de props
    const { history, producto, guardarRecargarProductos } = props;

    //refs
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('');
    //state
    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');

    const editarProducto = async  e => {
        e.preventDefault();

        //validar
        let nuevoValorPlatillo = precioPlatilloRef.current.value,
            nuevoNombrePlatillo = nombrePlatilloRef.current.value;

        if (nuevoNombrePlatillo === '' || nuevoValorPlatillo === '' || categoria === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //si cambio categoria ponerlo, sino dejar mismo valor
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;

        //obtener valores del form
        const editarPlatillo = {
            precioPlatillo: nuevoValorPlatillo,
            nombrePlatillo: nuevoNombrePlatillo,
            categoria: categoriaPlatillo
        }

        //enviar el request
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try {
            const resultado = await axios.put(url, editarPlatillo);

            if (resultado.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'El producto se editó correctamente!',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Algo salió mal!',
                text: 'Hubo un error, NO se editó el producto!'

            })
        }

        //redirigir a productos y consultar api para q tome cambios
        guardarRecargarProductos(true);
        history.push('/productos');

    }

    const leerValorRadio = e => {
        guardarCategoria(e.target.value)
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>


            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}

                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}

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
                            defaultChecked={(producto.categoria === 'postre')}
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
                            defaultChecked={(producto.categoria === 'bebida')}
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
                            defaultChecked={(producto.categoria === 'cortes')}
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
                            defaultChecked={(producto.categoria === 'ensalada')}
                        />
                        <label className="form-check-label">
                            Ensalada
                    </label>
                    </div>
                </div>

                <input type="submit"
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                    value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);