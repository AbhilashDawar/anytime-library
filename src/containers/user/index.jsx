import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import './user.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        console.log(this.props.activeUser)
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                {this.props.books.map((book, index) => (
                    <BookCard {...this.props} key={index} selectedBook={book} />
                ))}
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