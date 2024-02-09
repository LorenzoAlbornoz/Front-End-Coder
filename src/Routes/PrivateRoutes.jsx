import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = localStorage.getItem("codertoken")
    const decode = jwtDecode(token)
    console.log(decode)
}

const PrivateRoutes = () => {
    useAuth()
    const isAuth = localStorage.getItem("codertoken")
    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoutes