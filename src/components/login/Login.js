import React, { useState } from 'react'
import { useLocalState } from '../../util/LocalStorage'

const Login = () => {

    const url = 'http://localhost:8083/api/v1/auth/login';

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password
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
                return Promise.reject("Invalid Credentials.");
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
            <label htmlFor='password'>
                Password
            </label>
            <input type = "password" id = "password" value = {password} onChange = {(event) => setPassword(event.target.value)} />
        </div>
        <div>
            <button id = "login" type = "button" onClick={() => sendLoginRequest()}>Login</button>
        </div>
    </div>
  )
}

export default Login