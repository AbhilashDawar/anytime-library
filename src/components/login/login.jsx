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

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpand = () => {
    console.log("HELLO!!! this is submit button,");
  };

  handleReduce = () => {
    console.log("HELLO!!! this is cancel button,");
  };

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
            
          /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
          /><br />
        </CardText>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardActions>
          <SubmitButton myClick={this.handleExpand} />
          <CancelButton myClick={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}