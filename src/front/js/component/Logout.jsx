import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Logout = () => {
    const  { actions} = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear();
        actions.logout();
        navigate("/");
    })

    return (
        <h1>Cerrando Sesion....</h1>
    )
}