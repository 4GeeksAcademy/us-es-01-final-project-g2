import React from "react";
import { Link } from "react-router-dom";


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
							<Link to="/" className="nav-link">
								Home
							</Link>
							</li>
						</ul>
						<div className="ms-auto">
							<Link to="/signup" className="btn btn-primary">Sign Up</Link>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};
