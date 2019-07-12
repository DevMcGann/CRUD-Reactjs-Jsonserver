import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AgregarProducto from './components/AgregarProducto'
import EditarProducto from './components/EditarProducto'
import Productos from './components/Productos'
import Producto from './components/Producto'

function App() {

  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      //consultar la api de json-server
      const consultarApi = async () => {
        const resultado = await axios.get('http://localhost:4000/restaurant');
        guardarProductos(resultado.data);
      }
      consultarApi();
      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);



  /*------------------------------------R E T U R N --------------------------------*/
  return (

    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" render={() => (
            <Productos
              productos={productos}
              guardarRecargarProductos={guardarRecargarProductos}
            />
          )} />
          <Route exact path="/nuevo-producto"
            render={() => (
              <AgregarProducto
                guardarRecargarProductos={guardarRecargarProductos}
              />
            )} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/editar/:id"
            render={props => {
              const idProducto = parseInt(props.match.params.id);
              const producto = productos.filter(producto => producto.id === idProducto);

              return (
                <EditarProducto
                  producto={producto[0]}
                  guardarRecargarProductos={guardarRecargarProductos}

                />
              )
            }} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los Derechos Reservados</p>
    </Router>

  );
}

export default App;
