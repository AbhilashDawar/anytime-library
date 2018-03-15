import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import './user.css';
import { Menu } from 'material-ui';
import MenuItem from 'material-ui/MenuItem/MenuItem';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: this.props.books,
            issuedBooks: [],
            searchString: "",
            showFilter: false
        };
    }

    componentDidMount = () => {
        this.fetchIssuedBooks();
    }

    fetchIssuedBooks = () => {
        let userIssuedBooks = [];
        this.props.activeUser.issuedBooks.forEach((issuedBook) => {
            this.props.books.forEach((book) => {
                if (book.id === issuedBook.id) {
                    userIssuedBooks.push(book);
                    return;
                }
            });
        });
        this.setState({
            issuedBooks: userIssuedBooks
        });
    }

    handleSearchTextChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    };

    search = () => {
        let booksAfterSearch = [];
        this.props.books.forEach((book) => {
            if (book.volumeInfo.title.match(this.state.searchString)) {
                booksAfterSearch.push(book);
            } else if (this.matchAuthor(book, this.state.searchString)) {
                booksAfterSearch.push(book);
            }
        });
        this.setState({
            books: booksAfterSearch
        });
    };

    matchAuthor = (book, searchString) => {
        let flag = false;
        book.volumeInfo.authors.forEach((author) => {
            if (author.match(searchString)) {
                flag = true;
                return;
            }
        });
        return flag;
    }

    handleFilterClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            showFilter: true,
            anchorEl: event.currentTarget,
        });
    };

    handleFilterClose = () => {
        this.setState({
            showFilter: false,
        });
    };

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <div className="searchBar">
                    <div className="left">
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
                    <div className="right">
                        <RaisedButton
                            onClick={this.handleClick}
                            label="Click me"
                        />
                        <Popover
                            open={this.state.showFilter}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            onRequestClose={this.handleFilterClose}
                        >
                            <Menu>
                                <MenuItem primaryText="Refresh" />
                                <MenuItem primaryText="Help &amp; feedback" />
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Sign out" />
                            </Menu>
                        </Popover>
                    </div>
                </div>
                <div className="booksDisplayCard">
                    <div className="partitionTitile">
                        <span>Books in your possession</span>
                    </div>
                    {this.state.issuedBooks.map((book, index) => (
                        <BookCard key={index} selectedBook={book} />
                    ))}
                </div>
                <div className="booksDisplayCard">
                    <div className="partitionTitile">
                        <span>All Books</span>
                    </div>
                    {this.state.books.map((book, index) => (
                        <BookCard key={index} selectedBook={book} />
                    ))}
                </div>
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