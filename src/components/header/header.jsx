import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { withRouter } from 'react-router-dom';
import config from '../../config.jsx';
import './header.css';
import { connect } from 'react-redux';
import Logged from '../userActions/userActions.jsx';

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
                <Paper zDepth={2}>
                    <AppBar
                        title={<span className="appName">{config.appName}</span>}
                        onTitleClick={this.goToHome}
                        iconElementLeft={<div />}
                        iconElementRight={this.props.activeUser ? < Logged nameOfUser={this.props.nameOfUser} /> : <FlatButton label="Login" href="/login" />}
                        style={{ backgroundColor: '#00BCD4', margin: '0% 0% 1% 0%' }}
                    />
                </Paper>
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