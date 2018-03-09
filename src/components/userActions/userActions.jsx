import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/logoutUser.jsx';

class Logged extends React.Component {
    static muiName = 'IconMenu';

    state = {
        valueSingle: '3',
    };

    logout = () => {
        if (window.gapi) {
            const auth2 = window.gapi.auth2.getAuthInstance();
            if (auth2 != null) {
                auth2.signOut().then(
                    auth2.disconnect().then(this.props.onLogoutSuccess)
                )
            }
        }
        this.props.logoutUser();
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={<FlatButton label={this.props.nameOfUser} style={{ color: "#fff" }} />}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem value="Profile" primaryText="Profile" />
                <MenuItem value="Help" primaryText="Help" />
                <MenuItem value="Sign Out" primaryText="Sign Out" onClick={this.logout} />
            </IconMenu >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Logged);