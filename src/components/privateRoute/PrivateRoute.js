import React from 'react'
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../../util/LocalStorage'

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
  return (
    jwt ? children : <Navigate to="/api/v1/auth/login" />
  )
};

export default PrivateRoute