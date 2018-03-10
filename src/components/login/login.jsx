import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './login.css';
import appName from '../../config.jsx';
import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../bottons/submitButton.jsx';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/loginUser.jsx';
import { selectBook } from '../../actions/selectBook.jsx';
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
    if (res.googleId) {
      let user = {
        username: res.profileObj.email,
        givenName: res.profileObj.givenName,
        familyName: res.profileObj.familyName,
        imageUrl: res.profileObj.imageUrl,
        isGoogleUser: true
      }
      this.props.loginUser(user);
      this.props.history.push("/user");
    } else {
      let loggedIn = false;
      this.props.users.forEach((user, index) => {
        if (user.username === this.state.username) {
          if (user.password === this.state.password) {
            loggedIn = true;
            if (user.type === "ADMIN") {
              this.props.history.push("/admin");
              this.props.loginUser(user);
              return;
            } else if (user.type === "USER") {
              alert("Routing to USER Page...");
              this.props.loginUser(user);
              return;
            } else {
              alert("Somthing Wrong with the profile... Pelase Contact the ADMIN at your own risk");
              return;
            }
          } else {
            alert("Invalid Password!!!");
            return;
          }
        } else if (!loggedIn && index === this.props.users.length - 1) {
          alert("Invalid Username!!!");
          return;
        }
      })
    }
  };

  loginError = (res) => {
    console.log(res);
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
        <div className="parent">
          <div className="col-xs-12 col-sm-6 manualLogin">
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
            <CardActions>
              <SubmitButton chosenName="Submit" whenClicked={this.login} />
              <CancelButton chosenName="Cancel" whenClicked={this.logout} />
            </CardActions>
          </div>
          <div className="socialLogin">
            <GoogleLogin
              clientId="261108976291-6ulai3plser4mfgnsac81s9enkolf6s2.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={this.login}
              onFailure={this.loginError}
              fetchBasicProfile='true'
            />
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => dispatch(loginUser(user)),
  selectBook: (book) => dispatch(selectBook(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
