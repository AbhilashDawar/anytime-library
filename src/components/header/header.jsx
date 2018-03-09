import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/logoutUser.jsx';
import Logged from '../userActions/userActions.jsx';

class Login extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton label="Login" />
        );
    }
}

class Header extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div >
                <AppBar
                    title="Anytime Library"
                    iconElementLeft={< IconButton > < NavigationClose /> </IconButton>}
                    iconElementRight={this.props.activeUser ? < Logged nameOfUser={this.props.nameOfUser} /> : <FlatButton label="Login" href="/login" />}
                />
            </div >
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser
    };
};

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);