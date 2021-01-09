import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import './Nav.css';

export default class Navigation extends Component {
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Pokedex | Warung Pintar</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="ml-auto">
                        <NavLink to='/browse' className="nav-link" activeClassName='active'>Browse Pokemon</NavLink>
                        <NavLink to='/compare' className="nav-link" activeClassName='active'>Compare Pokemon</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}