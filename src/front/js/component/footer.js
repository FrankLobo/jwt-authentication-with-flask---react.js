import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center text-white">
		<p>
			Made with <i className="fa fa-heart text-danger " /> by{" "}
			<Link className="link-4geeks" href="http://www.4geeksacademy.com">4Geeks Academy</Link>
		</p>
	</footer>
);
