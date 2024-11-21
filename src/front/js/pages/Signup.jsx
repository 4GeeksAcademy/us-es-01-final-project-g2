import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();
        await actions.signup(email, password);
        navigate("/dashboard")
    };

    return (
        <div className="container d-flex flex-column bg-dark text-light align-items-center mt-5">
            <h2 className="mb-3">Sign up</h2>
            <p className="text-danger">
                or <Link to="/" className="text-primary">sign in to your account</Link>
            </p>
            <form className="w-50" onSubmit={handleSignup}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Sign up
                </button>
            </form>
        </div>
    );
};
