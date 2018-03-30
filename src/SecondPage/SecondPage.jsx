import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HasRole, { IsAdmin, IsUser } from '../HasRole';

import { userActions } from '../Components/_actions';

class SecondPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return(
            <div className="col-md-8 col-md-offset-3 text-center">
                <h1>Welcome To Second Page!</h1>
                <h4>This page is visible to users and admins!</h4>
                <h3>All registered users:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ol>
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                </li>
                            )}
                        </ol>
                    }
                <p style={firstLinkStyle}>
                    <Link to="/">Go to Home Page</Link>
                </p>
                <p style={linkStyle}>
                    <Link to="/">Go to First Page</Link>
                </p>
                <p style={ linkStyle }>
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

const firstLinkStyle = {
    margin: '20px',
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

const connectedSecondPage = connect(mapStateToProps)(SecondPage);
export { connectedSecondPage as SecondPage };