import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext, { Context } from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Footer } from "./component/Footer.jsx";
import { NavbarPublic } from "./component/NavbarPublic.jsx";
import { NavbarPrivado } from "./component/NavbarPrivado.jsx";
import { Logout } from "./component/Logout.jsx";
// Custon pages / views
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Signup } from "./pages/Signup.jsx";
import { FormLogin } from "./pages/FormLogin.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Perfil } from "./pages/Perfil.jsx";
import { Friendships } from "./pages/Friendships.jsx";
import { Perfil1 } from "./pages/Perfil1.jsx";
import { Perfil2 } from "./pages/Perfil2.jsx";
import { Perfil3 } from "./pages/Perfil3.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    const { store }= useContext(Context)

    return (
        <div className="bg-dark text-light d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>

                    <ScrollToTop>
                        {store.isLogin ? <NavbarPrivado/> :  <NavbarPublic /> }
                        <Routes>
                            <Route element={<FormLogin />} path="/" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<Friendships />} path="/friendships" />
                            <Route element={<Perfil />} path="/perfil" />
                            <Route element={<Perfil1 />} path="/profile/1" />
                            <Route element={<Perfil2 />} path="/profile/2" />
                            <Route element={<Perfil3 />} path="/profile/3" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} path="*" />
                            <Route element={<Signup />} path="/Signup" />
                            <Route element={<Logout />} path="/logout" />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
