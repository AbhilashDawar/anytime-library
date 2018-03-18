import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';

import config from '../../config.jsx';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import './user.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        let allFilters = {};
        config.filters.forEach((filter) => {
            allFilters[filter.key] = false;
        });
        this.state = {
            books: this.props.books,
            issuedBooks: [],
            searchString: "",
            showFilter: false,
            filters: allFilters
        };
    }

    componentDidMount = () => {
        this.fetchIssuedBooks();
    };

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
    };

    applyFilter = () => {
        let selectedFilters = [];
        Object.keys(this.state.filters).forEach((filter) => {
            if (this.state.filters[filter]) {
                config.filters.forEach((originalFilter) => {
                    if (originalFilter.key === filter) {
                        selectedFilters.push(originalFilter.name);
                        return;
                    }
                });
            }
        });
        let booksAfterFilters = [];
        this.props.books.forEach((book) => {
            let flag = false;
            selectedFilters.forEach((filter) => {
                book.volumeInfo.categories.forEach((category) => {
                    if (!flag && category.toLowerCase().match(filter.toLowerCase())) {
                        flag = true;
                        return;
                    }
                });
                if (flag) {
                    return;
                }
            });
            if (flag) {
                booksAfterFilters.push(book);
            }
            // if (book.volumeInfo.title.match(this.state.searchString)) {
            // } else if (this.matchAuthor(book, this.state.searchString)) {
            //     booksAfterSearch.push(book);
            // }
        });
        this.setState({
            books: booksAfterFilters
        });
    }

    showMyBooks = () => {
        if (this.state.issuedBooks.length === 0) {
            return <div className="noissuedBooks">No Issued Books</div>
        }
        return this.state.issuedBooks.map((book, index) => (
            <BookCard key={index} selectedBook={book} />
        ));
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

    updateCheck(x) {
        let updatedFilters = this.state.filters;
        updatedFilters[x] = !updatedFilters[x];
        this.setState({
            filters: updatedFilters
        });
    }

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Paper className="searchBar">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <div className="row">
                                <div className="col-xs-6">
                                    <TextField
                                        hintText="Search for Title/Author"
                                        floatingLabelText="Search"
                                        value={this.state.searchString}
                                        onChange={this.handleSearchTextChange}
                                        multiLine={true}
                                        rows={1}
                                        rowsMax={5}
                                    />
                                </div>
                                <div className="col-xs-6 searchButton">
                                    <SubmitButton chosenName="Search" whenClicked={this.search} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="col-xs-offset-9 col-xs-3">
                                <RaisedButton
                                    onClick={this.handleFilterClick}
                                    label="Click me"
                                />
                                <Popover
                                    open={this.state.showFilter}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    onRequestClose={this.handleFilterClose}
                                >
                                    <div className="filterPopover">
                                        <div className="filterCheckboxes">
                                            {config.filters.map((filter) => {
                                                return <Checkbox
                                                    style={{ width: '50%' }}
                                                    key={filter.key}
                                                    label={filter.name}
                                                    checked={this.state.filters[filter.key]}
                                                    onCheck={this.updateCheck.bind(this, filter.key)}
                                                />
                                            })}
                                        </div>
                                        <div className="filterActions">
                                            <SubmitButton chosenName="Apply Filter" whenClicked={this.applyFilter} />
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </Paper>
                <div className="booksDisplayCard">
                    <div className="partitionTitile">
                        <span>Books in your possession</span>
                    </div>
                    {this.showMyBooks()}
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