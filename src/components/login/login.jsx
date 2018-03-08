import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './login.css';
import appName from '../../config.jsx';
import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../bottons/submitButton.jsx';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginUser.jsx';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  login = (res) => {
console.log(res)

    // let loggedIn = false;
    // this.props.users.forEach((user, index) => {
    //   if (user.username === this.state.username) {
    //     if (user.password === this.state.password) {
    //       loggedIn = true;
    //       if (user.type === "ADMIN") {
    //         this.props.history.push("/admin");
    //         this.props.loginUser(user);
    //         return;
    //       } else if (user.type === "USER") {
    //         alert("Routing to USER Page...");
    //         this.props.loginUser(user);
    //         return;
    //       } else {
    //         alert("Somthing Wrong with the profile... Pelase Contact the ADMIN at your own risk");
    //         return;
    //       }
    //     } else {
    //       alert("Invalid Password!!!");
    //       return;
    //     }
    //   } else if (!loggedIn && index === this.props.users.length - 1) {
    //     alert("Invalid Username!!!");
    //     return;
    //   }
    // })
  };

  logout = () => {
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
        {/* <CardText>
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
          <SubmitButton chosenName="Submit" whenClicked={this.login} />
          <CancelButton chosenName="Cancel" whenClicked={this.logout} />
        </CardActions> */}
        <GoogleLogin
          clientId="261108976291-6ulai3plser4mfgnsac81s9enkolf6s2.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={this.login}
          onFailure={this.login}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => dispatch(loginUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
