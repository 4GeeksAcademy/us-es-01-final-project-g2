import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa"; // Import the Font Awesome user-plus icon
 

export const NavbarPublic = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
				<i className="fa-solid fa-user-group"></i>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link to="/" className="navbar-brand">
									<img
										src="https://i.ibb.co/NCzy07r/speak-processed.png"
										alt="Inicio"
										style={{ width: "128px", marginRight: "55px" }}
									/>
								</Link>
							</li>
						</ul>
						<div className="ms-auto">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link to="/signup" className="nav-link">
										<FaUserPlus className="me-2" /> Register
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};
