import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import Table from 'react-bootstrap/Table';

import Swal from 'sweetalert2'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

const User = () => {
    const [users, setUsers] = useState([]);
    let user;
    let token;
    try {
        user = JSON.parse(localStorage.getItem('token'));
        token = user.data.token;
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
        fetchUsers()
    }, [])

    /* 1. Display Users */
   const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/Employees', { headers: headers});
        const userDataArray = Object.values(response.data)[0];
        const usersData = userDataArray.filter(item => typeof item === 'object');
        console.log(usersData);
        setUsers(usersData);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
    
    /* 2. Create User */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [EmployeeID, setEmployeeID] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Phone, setPhone] = useState("")
    const [DepartmentID, setDepartmentID] = useState("")
    const [PositionID, setPositionID] = useState("")
    const [validationError, setValidationError] = useState({})

    const createProduct = async (e) => {

        e.preventDefault();

        console.log(EmployeeID);
        console.log(FirstName);
        console.log(LastName);
        console.log(Email);
        console.log(Password);
        console.log(Phone);
        console.log(DepartmentID);
        console.log(PositionID);

        const formData = new FormData()
        formData.append('EmployeeID', EmployeeID)
        formData.append('FirstName', FirstName) 
        formData.append('LastName', LastName) 
        formData.append('Email', Email) 
        formData.append('Password', Password)
        formData.append('DepartmentID', DepartmentID)
        formData.append('Position', PositionID)

            await axios.post('http://localhost:3001/Employees/register', {EmployeeID, FirstName, LastName, Email, Password, Phone, DepartmentID, PositionID}).then(({data})=>{
                Swal.fire({
                    icon:"success",
                    text:data.message
                })

                fetchUsers();
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

        await axios.delete(`http://localhost:3001/Employees/${id}`, {headers: headers}).then(({})=>{
            Swal.fire({
                icon:"success",
                text:"Succesfully Deleted"
            })

            fetchUsers()
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    return (
        <>

        
            <div className="container" style={{ maxWidth: '80%' , marginTop: '250px'}}>
                
                <div className='col-12'>
                    <Button variant="btn btn-dark mb-2 float-end btn-sm me-2" onClick={handleShow} >Add EMP</Button>
                </div>
                
                <Table striped bordered hover style={{fontSize: 'small'}}> 
                    <thead>
                        <tr>
                        <th>EmployeeID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DepartmentID</th>
                        <th>PositionID</th>
                        <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        users.length > 0 && (
                            users.slice(0, 10).map((row, key)=>(
                                <tr key={key}>
                                    <td>{row.EmployeeID}</td>
                                    <td>{row.FirstName}</td>
                                    <td>{row.LastName}</td>
                                    <td>{row.Email}</td>
                                    <td>{row.Phone}</td>
                                    <td>{row.DepartmentID}</td>
                                    <td>{row.PositionID}</td>
                                    <td>
                                        <Button className='btn btn-dark btn-sm' onClick={()=>deleteProduct(row.EmployeeID)}>
                                            Delete
                                        </Button>
                                        <Button className='btn btn-secondary btn-sm' onClick={()=>deleteProduct(row.EmployeeID)} style={{ marginLeft: '20px'}}>
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
                <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                
                <Form onSubmit={createProduct}>
                    <Row>
                        <Col>
                            <Form.Group controlId="EmployeeID">
                                <Form.Label >EmployeeID</Form.Label>
                                <Form.Control type="text" value={EmployeeID} onChange={(event)=>{setEmployeeID(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="FirstName">
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control type="text" value={FirstName} onChange={(event)=>{setFirstName(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="LastName">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" value={LastName} onChange={(event)=>{setLastName(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={Email} onChange={(event)=>{setEmail(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" value={Password} onChange={(event)=>{setPassword(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="Phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" value={Phone} onChange={(event)=>{setPhone(event.target.value)}}/>
                            </Form.Group>
                        </Col>
                    </Row>

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
                            <Form.Group controlId="PositionID">
                                <Form.Label>PositionID</Form.Label>
                                <Form.Control type="text" value={PositionID} onChange={(event)=>{setPositionID(event.target.value)}}/>
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
export default User;