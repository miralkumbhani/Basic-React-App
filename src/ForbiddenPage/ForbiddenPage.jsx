import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../Components/_actions/';

class ForbiddenPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;

        return(
            <div className="col-md-8 col-md-offset-3 text-center">
                <h1>Forbidden Page!!! </h1>
                <p>
                    Oops! You do not have access to this page!
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

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedForbiddenPage = connect(mapStateToProps)(ForbiddenPage);
export { connectedForbiddenPage as ForbiddenPage };