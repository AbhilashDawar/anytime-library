import React from 'react';
import './user.css';
import appName from '../../config.jsx';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        console.log(this.props.books)
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