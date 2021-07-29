import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoginApi from "../api/LoginApi";


// Sadece ADMIN yetkisine sahip olan kullanıcıların görüntüleyebileceği sayfaları ayırmamızı sağlar.
const AdminRoute = ({component: Component,  ...rest}) => {
    const user = LoginApi.getCurrentUser();

    // Kullanıcı varsa ve yetkisi ADMIN'i içeriyorsa component'i görüntüleyebilir, değilse Not Found sayfasına yönlendirilir.
    return (
        <Route {...rest} render={props => (
            user && user.authorities.includes("ADMIN") ?
                <Component {...props} />
                : <Redirect to="/not-found" />
        )} />
    );
};

export default AdminRoute;