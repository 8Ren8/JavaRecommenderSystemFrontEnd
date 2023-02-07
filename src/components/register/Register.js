import React, { useState } from 'react'
import { useLocalState } from '../../util/LocalStorage'

const Register = () => {

    const url = 'http://localhost:8083/api/v1/auth/register';

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");


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
            window.location.href = "/api/v1/movies";
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <div>
        <div>
            <label htmlFor='username'>
                Username
            </label>
            <input type = "text" id = "username" value = {username} onChange = {(event) => setUsername(event.target.value)} />
        </div>
        <div>
            <label htmlFor='email'>
                Email
            </label>
            <input type={"email"} id = "email" value = {email} onChange = {(event) => setEmail(event.target.value)} />
        </div>
        <div>
            <label htmlFor='password'>
                Password
            </label>
            <input type = "password" id = "password" value = {password} onChange = {(event) => setPassword(event.target.value)} />
        </div>
        <div>
            <label htmlFor='confirmPassword'>
                Confirm Password
            </label>
            <input type = "password" id = "confirmPassword" value = {confirmPassword} onChange = {(event) => setConfirmPassword(event.target.value)} />
        </div>
        <div>
            <input type = "hidden" id = "role" value = {"user"} onChange = {(event) => setRole(event.target.value)} />
        </div>
        <div>
            <button id = "register" type = "button" onClick={() => sendRegisterRequest()}>Register</button>
        </div>
    </div>
  )
}

export default Register