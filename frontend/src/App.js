import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";

import Nav from 'react-bootstrap/Nav';

import Dashboard from './Dashboard';
import Department from './Department';
import Positions from './Positions';
import Addresses from './Addresses';
import Salaries from './Salaries';
import Login from './Login';

const App = () => {

    return (
        <>      
            <Router>
                <Container>       
                  <Row>
                      <Col md={12}>  
                        <Routes>
                          <Route path="/" element={<Login />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/department" element={<Department />} />
                          <Route path="/positions" element={<Positions />} />
                           <Route path="/addresses" element={<Addresses />} />
                          <Route path="/salaries" element={<Salaries />} /> 
                        </Routes>
                      </Col>                                                                             
                    </Row>                     
            </Container>
          </Router>
          </> 
  );
};

export default App;
