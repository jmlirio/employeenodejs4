import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

import Table from 'react-bootstrap/Table';

import Swal from 'sweetalert2'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';


import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaChartBar, FaUsers, FaBuilding, FaMapMarkerAlt, FaMoneyBillAlt, FaDoorOpen, FaTrash, FaEdit, FaHome } from 'react-icons/fa'; 
import logo from './workunity.png';


const Salaries = () => {
    const [salaries, setSalaries] = useState([]);
    let salary;
    let token;
    try {
        salary = JSON.parse(localStorage.getItem('token'));
        token = salary.data.token;
    } catch (error) {
        // Handle JSON parsing error or token not found
        console.error("Error parsing token:", error);
        // Set token to a default value or handle the error as needed
        token = "";
    }

    /* Contains the token to be passed during endpoint request */
    const headers = {
        accept: 'application/json',
        Authorization: token
    }


    /* Autoloads the data */
    useEffect(()=>{
        fetchSalaries()
    }, [])

    /* 1. Display Salaries */
    const fetchSalaries = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Salaries', { headers: headers});
            const salaryDataArray = Object.values(response.data)[0];
            const salariesData = Array.isArray(salaryDataArray) ? salaryDataArray : [];
            console.log(salariesData);
            if (salariesData.length === 0) {
                // Handle the case when no departments are found
                // For example, display a message to the user
                console.log("No salaries found.");
            } else {
                setSalaries(salariesData);
            }
        } catch (error) {
            console.error('Error fetching salaries:', error);
        }
    }
    
    
    
    
    /* 2. Create Salary */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [SalaryID, setSalaryID] = useState("")
    const [EmployeeID, setEmployeeID] = useState("")
    const [SalaryAmount, setSalaryAmount] = useState("")
    const [validationError, setValidationError] = useState({})

    const createProduct = async (e) => {

        e.preventDefault();

        console.log(SalaryID);
        console.log(EmployeeID);
        console.log(SalaryAmount);

        const formData = new FormData()
        formData.append('SalaryID', SalaryID)
        formData.append('EmployeeId', EmployeeID) 
        formData.append('SalaryAmount', SalaryAmount) 

            await axios.post('http://localhost:3001/Salaries/register', {SalaryID, EmployeeID, SalaryAmount}).then(({data})=>{
                Swal.fire({
                    icon:"success",
                    text:data.message
                })

                fetchSalaries();
            }).catch(({response})=>{
                if(response.status===442){
                    setValidationError(response.data.errors)
                }else{
                    Swal.fire({
                        text:response.data.message,
                        icon:"error"
                    })
                }
            })  
        
    
    }

    const deleteProduct = async (id) => {
        console.log('Deleting salary with ID:', id);
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text:  "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=>{
            return result.isConfirmed
        });

        if(!isConfirm){
            return;
        }
        try {
        await axios.delete(`http://localhost:3001/Salaries/${id}`, {headers: headers});
            Swal.fire({
                icon:"success",
                text:"Succesfully Deleted"
            });

            fetchSalaries();
        }catch(error){
            Swal.fire({
                text:data.message,
                icon:"error"
            });
        }
    }


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

        </Nav>
        
      </div>
        
        <div className="container" style={{ maxWidth: '80%' , marginTop: '25px', marginRight: '50px'}}>
                
            <div className="total-users-box" style={{ marginBottom: '20px', padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
                Total Salaries: {salaries.length}
                </div>


                <div className='col-12'>
                    <Button variant="btn btn-dark mb-2 float-end btn-sm me-2" onClick={handleShow} >Add Salary</Button>
                </div>
                
                <Table striped bordered hover style={{fontSize: 'small'}}>
                    <thead>
                        <tr>
                        <th>Salary ID</th>
                        <th>Employee ID</th>
                        <th>Salary Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        salaries.length > 0 && (
                            salaries.slice(0, 10).map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.SalaryID}</td>
                                    <td>{row.EmployeeID}</td>
                                    <td>{row.SalaryAmount}</td>
                                    <td>
                                        <Button className='btn btn-dark btn-sm' onClick={()=>deleteProduct(row.SalaryID)} ><FaTrash/>
                                            
                                        </Button>
                                        <Button className='btn btn-secondary btn-sm' onClick={()=>deleteProduct(row.id)} style={{ marginLeft: '20px'}}> <FaEdit/>
                                            
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                    </tbody>

                </Table>    

            </div>   
           
            <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
                <Modal.Title>Add Salary</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={createProduct}>
                    <Row>
                        <Col>
                            <Form.Group controlId="SalaryID">
                                <Form.Label>SalaryID</Form.Label>
                                <Form.Control type="text" value={SalaryID} onChange={(event)=>{setSalaryID(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmployeeID">
                                <Form.Label>EmployeeID</Form.Label>
                                <Form.Control type="text" value={EmployeeID} onChange={(event)=>{setEmployeeID(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="SalaryAmount">
                                <Form.Label>SalaryAmount</Form.Label>
                                <Form.Control type="text" value={SalaryAmount} onChange={(event)=>{setSalaryAmount(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    

                    <Button variant='dark' className='mt-2' size='sm' block='block' type='submit'>Save</Button>

                </Form>
                </Modal.Body> 
            </Modal>
        
        </>
    );
}
export default Salaries;