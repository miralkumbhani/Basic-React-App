import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { history } from './Components/_helpers';
import propTypes from 'prop-types';

import { LoginPage } from './LoginPage';
import { ForbiddenPage } from './ForbiddenPage';

export class RequiredRoleBase extends React.Component {
    static propTypes = {
        isLoggedIn: propTypes.bool.isRequired,
        currentUserRole: propTypes.string.isRequired,
        requiredRole: propTypes.string
    }

    ensureAuth(props) {
        const isLoggedIn = props;
        if(!isLoggedIn) {
            <Router history={history}>
                <Route path="/login" component = { LoginPage } />
            </Router>
        } else if(!this.hasRequiredRole(props)) {
            <Router history={history}>
                <Route path="/forbiddenPage" component = { ForbiddenPage } />
            </Router>
        }

        return true;
    }

    //currentUserRole will be fetched from the props
    hasRequiredRole({ requiredRole, currentUserRole }) {
        return !requiredRole || requiredRole === currentUserRole;
    }

    componentWillReceiveProps(props){
        this.ensureAuth(props);
    }

    componentDidMount() {
        this.ensureAuth(this.props);
    }

    render() {
        const { isLoggedIn, children } = this.props;
        if(!isLoggedIn || !this.hasRequiredRole(this.props)) {
            return null;
        }
        return <div>{children}</div>;
    }
}

//this function maps the current state to props
const mapStateToProps = state => {
    const auth = state.authentication || {};
    const roleObj = auth.user || {};
    return {
        isLoggedIn: auth.loggedIn,
        currentUserRole: roleObj && roleObj.role ? roleObj.role : 'nobody'
    };
};

const RequiredRoleConnected = connect(mapStateToProps)(RequiredRoleBase);

export const RequireRole = (WrappedComponent, requireRoleProps = {}) => {
    return function(props) {
        return (
            <RequiredRoleConnected {...requireRoleProps}>
                <WrappedComponent {...props} />
            </RequiredRoleConnected>
        );
    };
};