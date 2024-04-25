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

const Positions = () => {
    const [positions, setPositions] = useState([]);
    let position;
    let token;
    try {
        position = JSON.parse(localStorage.getItem('token'));
        token = position.data.token;
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
        fetchPositions()
    }, [])

    /* 1. Display Positions */
    const fetchPositions = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Positions', { headers: headers});
            const positionDataArray = Object.values(response.data)[0];
            const positionsData = Array.isArray(positionDataArray) ? positionDataArray : [];
            console.log(positionsData);
            if (positionsData.length === 0) {
                // Handle the case when no departments are found
                // For example, display a message to the user
                console.log("No positions found.");
            } else {
                setPositions(positionsData);
            }
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    }
    
    
    
    
    /* 2. Create Position */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [PositionID, setPositionID] = useState("")
    const [PositionName, setPositionName] = useState("")

    const [validationError, setValidationError] = useState({})

    const createProduct = async (e) => {

        e.preventDefault();

        console.log(PositionID);
        console.log(PositionName);


        const formData = new FormData()
        formData.append('PositionID', PositionID)
        formData.append('PositionName', PositionName) 


            await axios.post('http://localhost:3001/Positions/register', {PositionID, PositionName}).then(({data})=>{
                Swal.fire({
                    icon:"success",
                    text:data.message
                })

                fetchPositions();
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

        await axios.delete(`http://localhost:3001/Positions/${id}`, {headers: headers}).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:"Succesfully Deleted"
            })

            fetchPositions()
        }).catch(({response:{status, data}})=>{
            if(status === 404){
                Swal.fire({
                    text:"Position not found",
                    icon:"error"
                })
            } else {
                Swal.fire({
                    text:data.message,
                    icon:"error"
                })
            }
        })
    }

    return (
        <>
              {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-secondary mb-3 fixed-top" >
          <Container fluid>
            <Navbar.Brand style={{ fontWeight: 'bold' }}>POSITIONS</Navbar.Brand>
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
                    <Button variant="btn btn-dark mb-2 float-end btn-sm me-2" onClick={handleShow} >Add Position</Button>
                </div>
                
                <Table striped bordered hover style={{fontSize: 'small'}}>
                    <thead>
                        <tr>
                        <th>PositionID</th>
                        <th>PositionName</th>

                        </tr>
                    </thead>

                    <tbody>
                    {
                        positions.length > 0 && (
                            positions.slice(0, 10).map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.PositionID}</td>
                                    <td>{row.PositionName}</td>

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
                <Modal.Title>Add Position</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={createProduct}>
                    <Row>
                        <Col>
                            <Form.Group controlId="PositionID">
                                <Form.Label>PositionID</Form.Label>
                                <Form.Control type="text" value={PositionID} onChange={(event)=>{setPositionID(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PositionName">
                                <Form.Label>PositionName</Form.Label>
                                <Form.Control type="text" value={PositionName} onChange={(event)=>{setPositionName(event.target.value)}}/>
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
export default Positions;