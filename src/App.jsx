import React, { Component } from 'react';
// import logo from './logo.svg';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/login/login.jsx';
import Admin from './containers/admin';
import Book from './containers/book';
import BookAdminView from './containers/bookAdminView';
import User from './containers/user';
import UserProfile from './containers/userProfile';
import BookForm from './containers/bookForm';
import './App.css';
import themeDefault from './theme-default.jsx';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" render={() => (
              this.props.activeUser ? (
                <Admin />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/user" render={() => (
              this.props.activeUser ? (
                <User />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/userProfile" render={() => (
              this.props.activeUser ? (
                <UserProfile />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/bookView" render={() => (
              this.props.activeUser ? (
                <Book />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/AdminBookView" render={() => (
              this.props.activeUser ? (
                <BookAdminView />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/bookForm" render={() => (
              this.props.activeUser ? (
                <BookForm />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(
  mapStateToProps
)(App);
