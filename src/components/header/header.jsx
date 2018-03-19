import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import config from '../../config.jsx';
import Logged from '../userActions/userActions.jsx';
import './header.css';

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
                        style={{ margin: '0% 0% 1% 0%' }}
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