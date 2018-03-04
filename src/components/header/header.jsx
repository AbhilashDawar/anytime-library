import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';
import './header.css'

class Login extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Login" />
        );
    }
}

function logoutMethod(text) {
    this.setState(text);
}

class Logged extends React.Component {
    static muiName = 'IconMenu';

    state = {
        valueSingle: '3',
    };

    logout = (event, value) => {
        logoutMethod({
            logged: false
        });
    };

    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={<IconButton > < MoreVertIcon /> </IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
                < MenuItem value="Profile" primaryText="Profile" />
                <MenuItem value="Help" primaryText="Help" />
                <MenuItem value="Sign Out" primaryText="Sign Out" onClick={this.logout} />
            </IconMenu >
        );
    };
}



/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: true
        }
        logoutMethod = logoutMethod.bind(this);
    }

    loginMethod = (event, logged) => {
        if (!this.state.logged) {
            this.setState({
                logged: true
            });
        }
    };

    render() {
        return (
            <div >
                <AppBar
                    title="Anytime Library"
                    iconElementLeft={< IconButton > < NavigationClose /> </IconButton>}
                    iconElementRight={this.state.logged ? < Logged /> : <FlatButton {...this.props} label="Login" href="/login" />}
                />
            </div >
        );
    }

}

export default Header;