import { useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from '../../api/axiosConfig';
import React from 'react'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AdminAddUser = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [role, setRole] = useState('user');

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPwd(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMsg('');
    }, [user, password, matchPassword])

    const url = 'http://localhost:8083/api/v1/auth/register';

    function addUserRequest() {

        api.post(url, {
            username: user,
            email: email,
            password: password,
            confirmPassword: matchPassword,
            role: role
        })
        .then((response) => {
            if (response.status === 200) {
                alert("User Added.")
            }
            else {
                throw new Error("Add User Failed.");
            }
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <section className="container d-flex flex-column align-items-center justify-content-center mt-4">
        <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
        <h1>Add New User</h1>
        <form>
            <label htmlFor="username">
                Username:
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                3 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
                Email:
            </label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
            />
            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, <br/>
                a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatchPwd && matchPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatchPwd || !matchPassword ? "hide" : "invalid"} />
            </label>
            <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                aria-invalid={validMatchPwd ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
            />
            <p id="confirmnote" className={matchPasswordFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>

            <label htmlFor="role">
                Role:
            </label>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value={"user"}>User</option>
                <option value={"admin"}>Admin</option>
            </select>

            <button className = "mt-4 btn btn-success" disabled={!validName || !validPassword || !validMatchPwd ? true : false} onClick={() => addUserRequest()}>Add User</button>
        </form>
    </section>
  )
}

export default AdminAddUser