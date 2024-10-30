import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100 fondo" 
		style={{
			backgroundImage: `url('https://cdn.pixabay.com/photo/2022/09/28/11/31/halloween-7484855_1280.jpg')`, // Reemplaza con la URL de tu imagen
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}}
		   >
			

			<div className="card text-center p-4 card-login">
				
				<h4 className="text-light">Iniciar <span className="text-primary">Sesion</span></h4>
				<form>
					<div className="mb-3">
						<input
							type="email"
							className="form-control form-control-lg"
							placeholder="nealgo@163.com"
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							className="form-control form-control-lg"
							placeholder="********"
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-lg w-100">Enter</button>
				</form>
				<div className="mt-3 d-flex justify-content-between">
					<a href="#login" className="text-light">Login</a>
					<a href="signup" className="text-light">Sign up</a>
				</div>
				<p className="text-light mt-4"> <br /> </p>
			</div>
		</div>
	);
};
