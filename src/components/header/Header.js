import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useState, useEffect } from 'react';

const Header = () => {

    const logout = () => {
        localStorage.removeItem("jwt");
        window.location.reload(false);
      };

  return (
    <Navbar bg = "dark" variant = "dark" expand = "lg">
        <Container fluid>
            <Navbar.Brand href = "/" style = {{"color": "silver"}}>
                Brand
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "navbarScroll" />
            <Navbar.Collapse id = "navbarScroll">
                <Nav
                    className = "me-auto my-2 my-lg-0"
                    style = {{maxHeight: '100px'}}
                    navbarScroll
                >
                    <NavLink className = "nav-link" to = "/api/v1/movies">Home</NavLink>
                    <NavLink className = "nav-link" to = "/favorites">Favorites</NavLink>
                </Nav>
                <Button variant = "outline-info" className = "me-2" onClick={logout}>Logout</Button>
                <NavLink className = "btn btn-outline-info me-2" to = "/api/v1/auth/login">LogIn</NavLink>
                <Button variant = "outline-info" className = "me-2">Register</Button> 
            </Navbar.Collapse>
        </Container>

    </Navbar>
  )
}

export default Header