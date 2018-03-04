import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import './login.css';
import appName from '../../config.jsx';
import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../bottons/submitButton.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  loginUser = () => {
    let loggedIn = false;
    this.props.users.forEach((user, index) => {
      if (user.username === this.state.username) {
        if (user.password === this.state.password) {
          loggedIn = true;
          if (user.type === "ADMIN") {
            alert("Routing to admin Page");
            return;
          } else if (user.type === "USER") {
            alert("Routing to USER Page");
            return;
          } else {
            alert("Somthing Wrong with the profile... Pelase Contact the ADMIN at your own risk");
            return;
          }
        } else {
          alert("Invalid Password!!");
          return;
        }
      } else if (!loggedIn && index === this.props.users.length - 1) {
        alert("Invalid Username!!");
        return;
      }
    })
  };

  logoutUser = () => {
    console.log("Logging Out");
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <Card className="card">
        <CardHeader
          title={appName}
          className="loginAppName"
        />
        <CardText>
          <TextField
            hintText="Username"
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          /><br />
        </CardText>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardActions>
          <SubmitButton myClick={this.loginUser} />
          <CancelButton myClick={this.logoutUser} />
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(Login);