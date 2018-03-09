import React from 'react';
import './user.css';
import appName from '../../config.jsx';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/header/header';

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
            <Header nameOfUser={this.props.activeUser.givenName} />
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(User);