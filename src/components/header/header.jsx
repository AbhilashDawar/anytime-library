import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { withRouter, Link } from 'react-router-dom';
import config from '../../config.jsx';
import './header.css';
import { connect } from 'react-redux';
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

    goToHome = () => {
        if (this.props.activeUser.type === 'USER') {
            this.props.history.push("/user");
        } else {
            this.props.history.push("/admin");
        }
    }

    render() {
        return (
            <div >
                <AppBar
                    title={config.appName}
                    onTitleClick={this.goToHome}
                    iconElementLeft={< IconButton > < NavigationClose /> </IconButton>}
                    iconElementRight={this.props.activeUser ? < Logged nameOfUser={this.props.nameOfUser} /> : <FlatButton label="Login" href="/login" />}
                    style={{ backgroundColor: '#4E342E' }}
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

export default withRouter(connect(
    mapStateToProps
)(Header));