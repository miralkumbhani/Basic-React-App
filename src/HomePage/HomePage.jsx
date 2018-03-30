import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../Components/_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }


    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi, {user.firstName}!</h1>
                <p>You're logged in!!!</p>
                <p style={linkStyle}>
                    <Link to="/firstPage">Go to First Page</Link>
                </p>
                <p style={linkStyle}>
                    <Link to="/secondPage">Go to Second Page</Link>
                </p>
                <p style={linkStyle}>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

//Inline styles
const linkStyle = {
    fontSize: '14px'
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };