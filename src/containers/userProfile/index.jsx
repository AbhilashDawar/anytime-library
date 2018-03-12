import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
// import './userProfile.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Card >
                    
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser,
        books: state.books
    };
}

export default connect(mapStateToProps)(User);