import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const FormLogin = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = { email, password };
    actions.login(dataToSend);
    navigate('/dashboard');
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100 "
      style={{
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/09/28/11/31/halloween-7484855_1280.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-11 col-lg-10 p-5 rounded-3 bg-dark bg-opacity-75 text-center text-light">
          <h2 className="text-light">
            Iniciar <span className="text-primary">Sesión</span>
          </h2>
          <form onSubmit={handleSubmit} className="py-3">
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={handleEmail}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="mb-3 input-group">
              <input
                type={hidePassword ? "password" : "text"}
                className="form-control form-control-lg"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={handlePassword}
                style={{ borderRadius: '10px 0 0 10px' }}
              />
              <span
                onClick={() => setHidePassword(!hidePassword)}
                className="input-group-text bg-dark text-light"
                style={{ borderRadius: '0 10px 10px 0', cursor: 'pointer' }}
              >
                {hidePassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
              </span>
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-lg w-100"
              style={{ borderRadius: '10px', backgroundColor: '#333' }}
            >
              Enter
            </button>
          </form>
          <div className="d-flex justify-content-between mt-3">
            <a href="#" className="text-light">Login</a>
            <a href="signup" className="text-light">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};
