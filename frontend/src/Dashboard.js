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

import { FaChartBar, FaUsers, FaBuilding, FaMapMarkerAlt, FaMoneyBillAlt, FaDoorOpen } from 'react-icons/fa'; 


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
          {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="bg-secondary mb-3 fixed-top">
              <Container fluid>
                <Navbar.Brand style={{ fontWeight: 'bold' }}>Employee Management System</Navbar.Brand>
                <span style={{ marginLeft: '990px' }}>{currentTime.toLocaleTimeString()}</span>
                
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      EMS{' '}
                      <span style={{ marginLeft: '95px', color: '#000000' }}>
                        Welcome, {user ? user.EmployeeID : 'id'} {user ? user.FirstName : 'name'}
                      </span>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/dashboard">
                        <FaChartBar /> Employees
                      </Nav.Link>
                      <Nav.Link href="/department">
                        <FaBuilding /> Departments
                      </Nav.Link>
                      <NavDropdown
                        title={
                          <>
                             See more
                          </>
                        }
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="/positions">
                          <FaUsers /> Positions
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/addresses">
                          <FaMapMarkerAlt /> Addresses
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/salaries">
                          <FaMoneyBillAlt /> Salaries
                        </NavDropdown.Item>
                         
                      <NavbarText>
                            <a href="#" onClick={handleLogout} style={{ marginLeft: '20px', textDecoration: 'none', color: 'inherit' }}>
                                <FaDoorOpen /> Logout
                            </a>
                    </NavbarText>
                      </NavDropdown>
                      

                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
                       
          <UserCircle user={user} />
      
          <div>
            {<User />}
            {/* {<Department />} */}
          </div>
        </>
      );
};

export default Dashboard;