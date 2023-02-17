import React, { useState } from 'react'
import { useLocalState } from '../../util/LocalStorage'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {

    const url = 'http://localhost:8083/api/v1/auth/register';

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrros] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [lsUsername, setLsUsername] = useLocalState("", "username");
    const [userID, setUserID] = useLocalState("", "userID");
    const [userRole, setUserRole] = useLocalState("", "userRole");


    function sendRegisterRequest() {
        const reqBody = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: "user"
        };

        fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                return Promise.reject("Register Failed.");
            }
        })
        .then((data) => {
            setJwt(data.token);
            setLsUsername(data.user.username);
            setUserID(data.user.userId);
            setUserRole(data.user.role);
            window.location.href = "/api/v1/movies";
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <div>
        <Form className="container d-flex flex-column align-items-center justify-content-center mt-4" style={{width: "50%"}}>
            <h2>Register</h2>
            <Form.Group className="mb-3" controlId="formBasicUsername"> 
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="text" value = {username} onChange = {(event) => setUsername(event.target.value)} placeholder="Username" />
                <Form.Control.Feedback type='invalid'>Please enter an username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail"> 
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="email" value = {email} onChange = {(event) => setEmail(event.target.value)} placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword"> 
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="password" value = {password} onChange = {(event) => setPassword(event.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword"> 
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="password" value = {confirmPassword} onChange = {(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword"> 
                <Form.Control style = {{width: "20rem"}} type="hidden" value = {"user"} onChange = {(event) => setRole(event.target.value)}/>
            </Form.Group>
            <Button variant = "info" onClick={() => sendRegisterRequest()}>Register</Button>
        </Form>
    </div>
  )
}

export default Register