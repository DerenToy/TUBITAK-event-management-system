import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoginApi from "../api/LoginApi";


// Sitemize ait url'lere sadece giriş yapmış kullanıcıların ulaşabilmesini sağlar.
// Sisteme giriş yapmamış kullanıcıları Not Found sayfasına yönlendirir.
const PrivateRoute = ({component: Component, ...rest}) => {
    const user = LoginApi.getCurrentUser();

    return (

        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
                : <Redirect to="/not-found" />
        )} />
    );
};

export default PrivateRoute;