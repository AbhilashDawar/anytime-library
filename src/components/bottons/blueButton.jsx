import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

export default class BlueButton extends React.Component {
    render() {
        return (
            <RaisedButton
                label={this.props.chosenName}
                onClick={this.props.whenClicked}
                backgroundColor={colors.blue900}
                style={{ margin: '5px 5px' }}
            />
        )
    }
}