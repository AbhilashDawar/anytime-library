import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../bottons/submitButton.jsx';
import { loginUser } from '../../actions/loginUser.jsx';
import { newUser } from '../../actions/newUser.jsx';
import { selectBook } from '../../actions/selectBook.jsx';
import config from '../../config.jsx';
import './login.css';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import { Link } from 'react-router-dom';
// import ThemeDefault from '../theme-default';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      buttonsDiv: {
        textAlign: 'center',
        padding: 10
      },
      flatButton: {
        color: grey500
      },
      checkRemember: {
        style: {
          float: 'left',
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey500
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500
        }
      },
      loginBtn: {
        float: 'right'
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: '#4f81e9'
      },
      btnGoogle: {
        background: '#e14441'
      },
      btnSpan: {
        marginLeft: 5
      },
      mybtn: {
        font: 'Sans-Sarif',
        // display: 'none'
      },
    };
  }

  loginAsAdmin = () => {
    this.setState({
      username: "admin",
      password: "admin"
    }, () => {
      this.login({});
    });
  }

  login = (res) => {
    if (res.googleId) {
      this.props.users.forEach((user, index) => {
        if (user.username === res.profileObj.email) {
          this.props.loginUser(user);
          this.props.history.push("/user");
        } else if (index === this.props.users.length - 1) {
          let user = {
            username: res.profileObj.email,
            givenName: res.profileObj.givenName,
            familyName: res.profileObj.familyName,
            imageUrl: res.profileObj.imageUrl,
            type: 'USER',
            issuedBooks: [],
            favoriteGenre: [],
            isGoogleUser: true
          }
          this.props.newUser(user);
          this.props.loginUser(user);
          this.props.history.push("/user");
        }
      })
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
              this.props.loginUser(user);
              this.props.history.push("/user");
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
    if (res.error === "idpiframe_initialization_failed") {
      alert("Looks like Third-Party Cookies Option is disabled in your browser. Please ensure the Third-Party Cookies are not blocked in your browser settings to login via Google+.");
    }
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
      <div>
        <div style={this.styles.loginContainer}>

          <Paper style={this.styles.paper}>

            <form>
              <div className="row">
                <div className="loginAppName">
                  <span>{config.appName}</span>
                </div>
              </div>
              <TextField
                hintText="Username"
                floatingLabelText="Username"
                fullWidth={true}
                value={this.state.username}
                onChange={this.handleUsernameChange}
              /><br />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                fullWidth={true}
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <div>
                <RaisedButton
                  label="Login"
                  primary={true}
                  style={this.styles.loginBtn}
                  onClick={this.login}
                />
              </div>
            </form>
          </Paper>

          <div style={this.styles.buttonsDiv}>
            <GoogleLogin
              clientId="261108976291-6ulai3plser4mfgnsac81s9enkolf6s2.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={this.login}
              onFailure={this.loginError}
              fetchBasicProfile='true'
            />
          </div>
        </div>
      </div>
      // <div>
      //   <div className="row">
      //     <div className="col-xs-offset-4 col-xs-4 loginAppName">
      //       <span>{config.appName}</span>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <Card className="col-xs-offset-2 col-xs-8">
      //       {/* <div className="row">
      //         <div className="col-xs-offset-2 col-xs-8">
      //           <CardHeader
      //             title={config.appName}
      //           // className="loginAppName"
      //           />
      //         </div>
      //       </div> */}
      //       <div className="row">
      //         <div className="col-xs-12">
      //           <CardText>
      //             <TextField
      //               hintText="Username"
      //               floatingLabelText="Username"
      //               fullWidth={true}
      //               value={this.state.username}
      //               onChange={this.handleUsernameChange}
      //             /><br />
      //             <TextField
      //               hintText="Password"
      //               floatingLabelText="Password"
      //               type="password"
      //               fullWidth={true}
      //               value={this.state.password}
      //               onChange={this.handlePasswordChange}
      //             /><br />
      //           </CardText>
      //         </div>
      //       </div>
      //       <div className="row">
      //         <div className="col-xs-offset-1">
      //           {/* <CardActions> */}
      //           <SubmitButton chosenName="Login" whenClicked={this.login} />
      //         </div>
      //         <div className="col-xs-offset-1">
      //           <GoogleLogin
      //             clientId="261108976291-6ulai3plser4mfgnsac81s9enkolf6s2.apps.googleusercontent.com"
      //             buttonText="Login With Google"
      //             style={{
      //               color: 'white',
      //               padding: '8px',
      //               borderRadius: '5px',
      //               margin: 2,
      //               fontSize: 13,
      //               background: '#b71c1c',
      //               marginLeft: 5
      //             }}
      //             onSuccess={this.login}
      //             onFailure={this.loginError}
      //             fetchBasicProfile='true'
      //           />
      //           <button onClick={this.loginAsAdmin}>Admin</button>
      //           {/* </CardActions> */}
      //         </div>
      //       </div>
      //     </Card>
      //   </div>
      // </div >
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
  newUser: (user) => dispatch(newUser(user)),
  selectBook: (book) => dispatch(selectBook(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
