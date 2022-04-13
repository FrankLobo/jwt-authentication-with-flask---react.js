import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
    const { actions } = useContext(Context);

    const history = useHistory();
    let allGood = false;
    const [loginform, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const [loginErrors, setLoginErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newState = { ...loginform };
        newState[name] = value;
        setLoginForm(newState);
    }

    const handleValidate = (loginform) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!loginform.email) {
            errors.email = "Email es requerido!";
            allGood = true;
        } else if (!regex.test(loginform.email)) {
            errors.email = "Tu correo no es valido!";
        }
        if (!loginform.password) {
            errors.password = "Password es requerido!";
            allGood = true;
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginErrors(handleValidate(loginform))
        if (allGood === false) {
            let formData = new FormData();
            formData.append('email', loginform.email);
            formData.append('password', loginform.password);
            actions.login(formData, history);
            e.target.reset();
            return allGood = true;
        } else return false;
    }
    return (
        <>
            <div className="main-login mt-5">
                <div className="container-login">
                    <h1 className="title-login">Login</h1>
                    <form className="form-login" onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => { handleChange(e) }} />
                        </div>
                        <p className="errors-login">{loginErrors.email}</p>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => { handleChange(e) }} />
                            <p className="errors-login">{loginErrors.password}</p>
                        </div>
                        <button type="submit" className="btn btn-primary button-login d-grid gap-2 col-3 mx-auto">Enter</button>
                    </form>
                </div>
            </div>
        </>
    );
};