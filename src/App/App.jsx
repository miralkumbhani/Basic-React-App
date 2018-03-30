import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../Components/_helpers';
import { alertActions } from '../Components/_actions';
import { PrivateRoute } from '../Components/_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { FirstPage } from '../FirstPage';
import { SecondPage } from '../SecondPage';
// import { AuthorizedComponent } from 'react-router-role-authorization';
import HasRole, { IsAdmin, IsUser } from '../HasRole';
import { RequireRole } from '../RequiredRoleBase';
import { ForbiddenPage } from '../ForbiddenPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, isLoggedIn } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div className="text-center">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <IsAdmin>
                                    <PrivateRoute path="/firstPage" component={FirstPage} />
                                </IsAdmin>
                                <IsUser>
                                    <PrivateRoute path="/firstPage" component={ForbiddenPage} />
                                </IsUser>
                                <PrivateRoute path="/secondPage" component={SecondPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const auth = state.authentication;
    const isLoggedIn = auth.loggedIn;
    return {
        alert,
        isLoggedIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };