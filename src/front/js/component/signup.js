import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const SignUp = () => {

    const { actions } = useContext(Context);

    const history = useHistory();

    let allGood = false;

    const [signUpForm, setSignUpForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    console.log(signUpForm);

    const [signUpErrors, setSignUpErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newState = { ...signUpForm };
        newState[name] = value;
        setSignUpForm(newState);
    }

    const handleValidate = (signUpForm) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!signUpForm.first_name) {
            errors.first_name = "First name is required!";
            allGood = true;
        }
        if (!signUpForm.last_name) {
            errors.last_name = "Last name is required!";
            allGood = true;
        }
        if (!signUpForm.email) {
            errors.email = "Email is required!";
            allGood = true;
        } else if (!regex.test(signUpForm.email)) {
            errors.email = "Invalid email!";
        }
        if (!signUpForm.password) {
            errors.password = "Password is required!";
            allGood = true;
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignUpErrors(handleValidate(signUpForm));
        if (allGood === false) {
            let formData = new FormData();
            formData.append('first_name', signUpForm.first_name);
            formData.append('last_name', signUpForm.last_name);
            formData.append('email', signUpForm.email);
            formData.append('password', signUpForm.password);
            actions.signUp(formData, history);
            e.target.reset();
            allGood = true;
        } else return false;
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="container-signup mt-5">
                    <h1 className="title-signup text-white text-center">Signup</h1>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First name" onChange={(e) => { handleChange(e) }} />
                        <p className="errors-signup">{signUpErrors.first_name}</p>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last name" onChange={(e) => { handleChange(e) }} />
                        <p className="errors-signup">{signUpErrors.last_name}</p>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={(e) => { handleChange(e) }} />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                        <p className="errors-signup">{signUpErrors.email}</p>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(e) => { handleChange(e) }} />
                        <p className="errors-signup">{signUpErrors.password}</p>
                    </div>
                    <button type="submit" className="btn btn-primary button-login d-grid gap-2 col-3 mx-auto button-enter">Enter</button>
                </div>
            </form>
        </>
    );
};
