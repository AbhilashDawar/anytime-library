import React, { Component } from 'react';
// import logo from './logo.svg';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.jsx';
import Login from './components/login/login.jsx';
import Admin from './containers/admin/admin.jsx';
import User from './containers/user/user.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/user" component={User} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}



export default App;
