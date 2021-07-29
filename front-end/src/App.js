import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./views/Login/Login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {AdminView} from "./views/AdminView";
import {QrGenerator} from "./views/QrCode/QrGenerator";
import {UserView} from "./views/UserView";
import {NotFound} from "./views/notFound/404NotFound";
import LoginApi from "./views/api/LoginApi";

import logo from './logo.png';
import PrivateRoute from "./views/route/PrivateRoute";
import AdminRoute from "./views/route/AdminRoute";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";


// Navigasyon bar'ının oluşturulduğu, route işlemlerinin gerçekleştirildiği component'tir.
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminPage: false,
    };
  }

  componentDidMount() {
    const user = LoginApi.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminPage: user.authorities.includes("ADMIN"),
      });
    }
  }

  logOut() {
    LoginApi.logout();
  }

  render() {
    const { currentUser, showAdminPage } = this.state;

    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark">
            {
              currentUser ? (
                    showAdminPage ? (
                        <Link to={"/events/admin"} className="navbar-brand">
                          <img
                              src={logo}
                              alt="logo"
                              className="logo"
                          />
                        </Link>

                    ) : (
                        <Link to={"/events/user"} className="navbar-brand">
                          <img
                              src={logo}
                              alt="logo"
                              className="logo"
                          />
                        </Link>
                    )


              ) :(
                  <Link to={"/login"} className="navbar-brand">
                    <img
                        src={logo}
                        alt="logo"
                        className="logo"
                    />
                  </Link>

              )


            }


              <div className="navbar-nav">
                {
                  currentUser && (
                      showAdminPage? (
                          <li className="nav-item">
                            <Link to={"/events/admin"} className="nav-link">
                              Dashboard
                            </Link>
                          </li>

                      ) : (
                          <li className="nav-item">
                            <Link to={"/events/user"} className="nav-link">
                              Home
                            </Link>
                          </li>
                      )

                  )


                }

              </div>


            {currentUser ? (
                <div className="navbar-nav">
                  <li className="nav-item logOut">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                     Log Out&nbsp;
                    <FontAwesomeIcon icon={faSignOutAlt} />

                    </a>
                  </li>
                </div>
            ) : (
                ""
            )}
          </nav>

          <div className="container mt-2">
            <Switch>
            <Route component={Login} path="/" exact />
            <Route path="/login" component={Login} />
            <Route component={NotFound} path="/not-found" exact />
            <PrivateRoute component={UserView} path="/events/user"  exact />
            <AdminRoute  isAdmin={true} component={AdminView} path="/events/admin" exact/>
            <PrivateRoute component={QrGenerator} path= "/qr-code"  exact />

            </Switch>
          </div>
        </div>
    );
  }
}

export default App;