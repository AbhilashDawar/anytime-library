import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField/TextField';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
// import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../bottons/submitButton.jsx';
import './user.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: this.props.books,
            searchString: ""
        };
    }

    handleSearchTextChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    };

    search = () => {
        this.props.books.forEach((book) => {
            // if(book.volumeInfo.title.match(this.state.searchString)){
                
            // } else if(book.volumeInfo.authors.)
        })
    };

    render() {
        console.log(this.props.activeUser)
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <div className="searchBar">
                    <TextField
                        hintText="Search for Title/Author"
                        floatingLabelText="Search"
                        value={this.state.searchString}
                        onChange={this.handleSearchTextChange}
                        multiLine={true}
                        rows={1}
                        rowsMax={5}
                    />
                    <SubmitButton chosenName="Search" whenClicked={this.search} />
                </div>
                {this.props.books.map((book, index) => (
                    <BookCard key={index} selectedBook={book} />
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