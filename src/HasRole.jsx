import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


class HasRole extends React.Component {

    static propTypes = {
        currentUserRole: propTypes.string.isRequired,
        requiredRole: propTypes.string.isRequired
    }


    render() {
        const { children, currentUserRole, requiredRole } = this.props;
        if (currentUserRole !== requiredRole) {
            return null;
        }
        return (
            <div className={this.props.className}>
                {children}
            </div>
        );
    }
}

const getMapStateToProps = (extendWith = {}) => state => {
    const auth = state.authentication || {};
    const roleObj = auth.user;
    return {
        currentUserRole: roleObj && roleObj.role ? roleObj.role : 'nobody',
        ...extendWith
    };
};

export default connect(getMapStateToProps())(HasRole);
export const IsAdmin = connect(getMapStateToProps({ requiredRole: 'admin' }))(HasRole);
export const IsUser = connect(getMapStateToProps({ requiredRole: 'user' }))(HasRole);