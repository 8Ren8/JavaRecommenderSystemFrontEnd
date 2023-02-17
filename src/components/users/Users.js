import React from 'react';
import { useEffect, useState } from "react";
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import {Container, Table, Button } from 'react-bootstrap';

const Users = () => {

    //store fetched users
    const [users, setUsers] = useState();

    //fetch users from api
    useEffect(() => {
        const getUsers = async () => {

            try{
        
              const response = await api.get("/api/v1/users");
              const usersResult = await response.data;
        
              setUsers(usersResult);
        
            } catch(err) {
              console.log(err);
            }
          }
        getUsers();
    }, [])

    const navigate = useNavigate();

    function addNewUser(){
        navigate(`/admin/users/addUser`);
    }


  return (
    <div>
        <Container fluid className='mt-4 d-flex flex-column align-items-center justify-content-center'>
            <h2 className='text-center'>List of Users</h2>
            <Button variant="success" className='mb-4 info' onClick = {() => addNewUser()}>Add New User</Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user) => {
                            return (
                                <tr>
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    </div>
  )
}

export default Users