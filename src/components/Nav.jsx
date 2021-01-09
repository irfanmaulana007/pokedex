import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <NavLink to="/" className="navbar-brand">Pokedex | Warung Pintar</NavLink>
                
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/browse" className="nav-link">Browse Pokemon</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/compare" className="nav-link">Compare Pokemon</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}