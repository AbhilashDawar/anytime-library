import React from 'react';
import './admin.css';
import appName from '../../config.jsx';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/header/header';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        console.log("ADMIN->", this.props.activeUser)
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.firstName} />
                You are in admin page.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    };
}

export default connect(mapStateToProps)(Admin);