import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthService from '../../services/AuthService';
import { useState, useEffect } from 'react';

const Header = () => {

    //logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
        localStorage.removeItem("userRole");
        window.location.reload(false);
      };

    //store userID in a variable
    const userID = localStorage.getItem("userID");
    const userRole = JSON.parse(localStorage.getItem("userRole"));

    //navigation to other pages
    const navigate = useNavigate();

    const navigateToAdminUsersPage = () => {
        navigate('/admin/users');
    }

    const navigateToAdminMoviesPage = () => {
        navigate('/admin/addMovie');
    }

  //navigation bar
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
                    <NavLink className = "nav-link" to = "/disabled" style={{pointerEvents: "none"}}>{JSON.parse(localStorage.getItem("username"))}</NavLink>
                </Nav>
                {userRole === "admin" && (
                        <DropdownButton variant = "info" menuVariant = "dark" className = "me-2" title = "Admin Operations">
                            <Dropdown.Item eventKey="1" onClick={navigateToAdminUsersPage}>Users</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={navigateToAdminMoviesPage}>Movies</Dropdown.Item>
                        </DropdownButton>
                    )
                }
                {userID > 0 ? (
                        <Button variant = "outline-info" className = "me-2" onClick={logout}>Logout</Button>
                    ) : (
                        <div>
                            <NavLink className = "btn btn-outline-info me-2" to = "/api/v1/auth/login">LogIn</NavLink>
                            <NavLink className = "btn btn-outline-info me-2" to = "/api/v1/auth/register">Register</NavLink>
                        </div>
                    )
                }
                {/* <Button variant = "outline-info" className = "me-2" onClick={logout}>Logout</Button>
                <NavLink className = "btn btn-outline-info me-2" to = "/api/v1/auth/login">LogIn</NavLink>
                <Button variant = "outline-info" className = "me-2">Register</Button> */}
            </Navbar.Collapse>
        </Container>

    </Navbar>
  )
}

export default Header