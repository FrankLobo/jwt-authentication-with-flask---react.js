import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const Private = ({ component: Component, ...rest }) => {

    const isAuthenticated = () => {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token) {
            return true;
        } else return false;
    }

    useEffect(() => {
        isAuthenticated()
    }, []);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
};