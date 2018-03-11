import React from 'react';
import { connect } from 'react-redux';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import Header from '../../components/header/header';
import './admin.css';

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
                <Header nameOfUser={this.props.activeUser.givenName} />
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