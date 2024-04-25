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


import Table from 'react-bootstrap/Table';

import Swal from 'sweetalert2'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';


import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaChartBar, FaUsers, FaBuilding, FaMapMarkerAlt, FaMoneyBillAlt, FaDoorOpen } from 'react-icons/fa'; 
const Department = () => {
    const [departments, setDepartments] = useState([]);
    let department;
    let token;
    try {
        department = JSON.parse(localStorage.getItem('token'));
        token = department.data.token;
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
        fetchDepartments()
    }, [])

    /* 1. Display Departments */
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Departments', { headers: headers});
            const departmentDataArray = Object.values(response.data)[0];
            const departmentsData = Array.isArray(departmentDataArray) ? departmentDataArray : [];
            console.log(departmentsData);
            if (departmentsData.length === 0) {
                // Handle the case when no departments are found
                // For example, display a message to the user
                console.log("No departments found.");
            } else {
                setDepartments(departmentsData);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }
    
    
    
    
    /* 2. Create Department */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [DepartmentID, setDepartmentID] = useState("")
    const [DepartmentName, setDepartmentName] = useState("")

    const [validationError, setValidationError] = useState({})

    const createProduct = async (e) => {

        e.preventDefault();

        console.log(DepartmentID);
        console.log(DepartmentName);


        const formData = new FormData()
        formData.append('DepartmentID', DepartmentID)
        formData.append('DepartmentName', DepartmentName) 


            await axios.post('http://localhost:3001/Departments/register', {DepartmentID, DepartmentName}).then(({data})=>{
                Swal.fire({
                    icon:"success",
                    text:data.message
                })

                fetchDepartments();
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

        await axios.delete(`http://localhost:3001/Departments/${id}`, {headers: headers}).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:"Succesfully Deleted"
            })

            fetchDepartments()
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    return (
        <>
              {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-secondary mb-3 fixed-top" >
          <Container fluid>
            <Navbar.Brand style={{ fontWeight: 'bold' }}>DEPARTMENTS</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  EMS
                </Offcanvas.Title>
                
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/dashboard"><FaChartBar />Employees</Nav.Link>
                  <Nav.Link href="/department"><FaBuilding />Departments</Nav.Link>
                  <NavDropdown
                    title="See more"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/positions"><FaUsers />Positions</NavDropdown.Item>
                    <NavDropdown.Item href="/addresses"><FaMapMarkerAlt />
                      Addresses
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="/salaries"><FaMoneyBillAlt />
                      Salaries
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                    
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Navbar.Text style={{ color: 'black'}}>
                        
                        
                    </Navbar.Text>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        
            <div className="container" style={{ maxWidth: '80%',  marginTop: '250px'}}>
                
                <div className='col-12'>
                    <Button variant="btn btn-dark mb-2 float-end btn-sm me-2" onClick={handleShow} >Add Department</Button>
                </div>
                
                <Table striped bordered hover style={{fontSize: 'small'}}>
                    <thead>
                        <tr>
                        <th>DepartmentID</th>
                        <th>DepartmentName</th>

                        </tr>
                    </thead>

                    <tbody>
                    {
                        departments.length > 0 && (
                            departments.slice(0, 10).map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.DepartmentID}</td>
                                    <td>{row.DepartmentName}</td>

                                    <td>
                                        <Button className='btn btn-dark btn-sm' onClick={()=>deleteProduct(row.id)} >
                                            Delete
                                        </Button>
                                        <Button className='btn btn-secondary btn-sm' onClick={()=>deleteProduct(row.id)} style={{ marginLeft: '20px'}}>
                                            Update
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
                <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={createProduct}>
                    <Row>
                        <Col>
                            <Form.Group controlId="DepartmentID">
                                <Form.Label>DepartmentID</Form.Label>
                                <Form.Control type="text" value={DepartmentID} onChange={(event)=>{setDepartmentID(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="DepartmentName">
                                <Form.Label>DepartmentName</Form.Label>
                                <Form.Control type="text" value={DepartmentName} onChange={(event)=>{setDepartmentName(event.target.value)}}/>
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
export default Department;