import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HasRole, { IsAdmin, IsUser } from '../HasRole';

import { userActions } from '../Components/_actions';

class FirstPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return(
            <div className="col-md-8 col-md-offset-3 text-center">
                <h1>Welcome To First Page!</h1>
                <IsAdmin className="div-admin"><b> You (Admin) can view/change this! </b>
                    <h3>All registered users:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ol>
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}
                        </ol>
                    }
                </IsAdmin>
                <IsUser className="div-user"><b> You (User) can view this! </b>
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
                </IsUser>
                <p style={firstLinkStyle}>
                    <Link to="/">Go to Home Page</Link>
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

const connectedFirstPage = connect(mapStateToProps)(FirstPage);
export { connectedFirstPage as FirstPage };