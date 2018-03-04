import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

export default class CancelButton extends React.Component {
    render() {
        return (
            <RaisedButton backgroundColor={colors.green900} label="Submit" onClick={this.props.myClick} />
        )
    }
}