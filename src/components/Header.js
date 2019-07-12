import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/productos" className="navbar-brand">React Crud & Routing</Link>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-items">
                        <NavLink
                            to="/productos"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Productos
                        </NavLink>
                    </li>

                    <li className="nav-items">
                        <NavLink
                            to="/nuevo-producto"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Nuevo Producto
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Header;