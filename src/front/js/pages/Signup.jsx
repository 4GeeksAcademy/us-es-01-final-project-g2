import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h2 className="mb-3">Sign up</h2>
            <p className="text-danger">
                or <a className="text-primary" href="/">sign in to your account</a>
            </p>
            <form className="w-50">
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Surname" />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Sign up
                </button>
            </form>
        </div>
    );
};
