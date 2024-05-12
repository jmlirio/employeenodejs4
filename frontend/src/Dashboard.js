import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { jwtDecode } from 'jwt-decode';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

import User from './User';
// import Department from './Department';
import "./App.css"

import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavbarText from 'react-bootstrap/esm/NavbarText';

import UserCircle from './UserCircle';

import { FaChartBar, FaUsers, FaBuilding, FaMapMarkerAlt, FaMoneyBillAlt, FaDoorOpen, FaTrash, FaEdit, FaHome } from 'react-icons/fa'; 
import logo from './workunity.png';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date()); // State to hold current time
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/login");
                    return;
                }
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Error fetching user", error); 
                navigate("/login");
            }
        };

        fetchUser();
        



        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
        }, []);
    
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error)
        }
    };

    return (
        <>
      <div className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
        <Nav className="flex-column">
        <Nav.Link as={Link} to="/home">
            <FaHome /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            <FaChartBar /> Employees
          </Nav.Link>
          <Nav.Link as={Link} to="/department">
            <FaBuilding /> Departments
          </Nav.Link>
          <Nav.Link as={Link} to="/positions">
            <FaUsers /> Positions
          </Nav.Link>
          <Nav.Link as={Link} to="/addresses">
            <FaMapMarkerAlt /> Addresses
          </Nav.Link>
          <Nav.Link as={Link} to="/salaries">
            <FaMoneyBillAlt /> Salaries
          </Nav.Link>
          <Nav.Link onClick={handleLogout} style={{ marginTop: '45vh' }}>
            <FaDoorOpen /> Logout
          </Nav.Link>
        </Nav>
        
      </div>
       
                       
          <UserCircle user={user} />
      
          <div>
            {<User />}
            {/* {<Department />} */}
          </div>
        </>
      );
};

export default Dashboard;