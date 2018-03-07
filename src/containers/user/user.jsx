import React from 'react';
import './user.css';
import appName from '../../config.jsx';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        console.log(this.props.activeUser);
        return (
            <div>
            You are in user page.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(User);