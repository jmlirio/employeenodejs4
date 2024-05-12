import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FaChartBar, FaBuilding, FaUsers, FaMapMarkerAlt, FaMoneyBillAlt } from 'react-icons/fa';
import './App.css';
import logo from './workunity.png';
const Home = () => {

    const routes = [
        { text: 'Employees', icon: <FaChartBar />, link: 'dashboard' },
        { text: 'Department', icon: <FaBuilding />, link: 'department' },
        { text: 'Addresses', icon: <FaMapMarkerAlt />, link: 'addresses' },
        { text: 'Salaries', icon: <FaMoneyBillAlt />, link: 'salaries' },
        { text: 'Positions', icon: <FaUsers />, link: 'positions' },
      ];

  return (
    <>
      <Navbar bg="dark" variant="dark" className='bg-secondary mb-3 fixed-top'>
      <Navbar.Brand style={{ fontWeight: 'bold', marginLeft: '30px', height: '50px' }}>
              <img
                src={logo}
                width="185"
                height="35"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
      </Navbar>
    
    <div className="container-wrapper_home">
      <div className="squares">
        {routes.map((route, index) => (
          <Link key={index} to={`/${route.link}`} className="square">
            <div className="content">
              {route.icon}
              {route.text}
            </div>
          </Link>
        ))}
      </div>
    </div>

    </>
  );
};

export default Home;