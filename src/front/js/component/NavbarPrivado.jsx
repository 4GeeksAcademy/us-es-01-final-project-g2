import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

export const NavbarPrivado = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ borderBottom: '1px solid #94b9ff' }}>
			<Container fluid>
				<Link to="/dashboard" className="navbar-brand">
					<img src="https://i.ibb.co/NCzy07r/speak-processed.png" alt="Inicio" style={{ width: '170px' }} />
				</Link>
				<Navbar.Toggle aria-controls="navbarNav" />
				<Navbar.Collapse id="navbarNav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/profile" className="text-white">Perfil</Nav.Link>
						<Nav.Link as={Link} to="/logout" className="text-white">
							<i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '1.2rem', color: 'white', marginRight: '5px' }}></i>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
