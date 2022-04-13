import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/home">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/demo">Features</Link>
						</li>
					</ul>
					<ul className="navbar-nav two">
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">Signup</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login" onClick={() => actions.logOut(history)}>Logout</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
