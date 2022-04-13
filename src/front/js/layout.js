import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Private } from "./component/private";
import { Login } from "./component/login";
import { SignUp } from "./component/signup";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const [isToken, setIsToken] = useState({
		datos_babies: [],
		email: "",
		profile: {
			apellido: "",
			avatar: "",
			nombre: ""
		},
		roles: {
			id: null,
			rol_name: ""
		}
	})

	useEffect(() => {
		if (sessionStorage.getItem('token')) {
			setIsToken(JSON.parse(sessionStorage.getItem('token')));
		}
	}, []);

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/login" component={Login} />
						<Private exact path="/home" component={Home} />
						<Private exact path="/demo" component={Demo} />
						<Private exact path="/single" component={Single} />
						<Private>
							<Route>
								<h1>Not found!</h1>
							</Route>
						</Private>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
