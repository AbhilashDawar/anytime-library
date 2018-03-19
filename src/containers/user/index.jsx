import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField/TextField';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';

import config from '../../config.jsx';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import BlueButton from '../../components/bottons/blueButton.jsx';
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
            showRecommendedBooks: false,
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
            if (book.volumeInfo.title.toLowerCase().match(this.state.searchString.toLowerCase())) {
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
            if (author.toLowerCase().match(searchString.toLowerCase())) {
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

    showFavBooks = () => {
        if (this.props.activeUser.favoriteGenre.length === 0) {
            return <div className="noissuedBooks">No Favorite Genre Set in Profile</div>
        } else {
            let booksAfterFilters = [];
            this.props.books.forEach((book) => {
                let flag = false;
                this.props.activeUser.favoriteGenre.forEach((filter) => {
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
            });
            return booksAfterFilters.map((book, index) => (
                <BookCard key={index} selectedBook={book} />
            ));
        }
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

    toggleShowRecommendedBooks = () => {
        this.setState({
            showRecommendedBooks: !this.state.showRecommendedBooks
        });
    }

    toggleShowMyBooks = () => {
        this.setState({
            showMyBooks: !this.state.showMyBooks
        });
    }

    render() {
        let recommendedBooksStyle, myBooksStyle;
        if (this.state.showRecommendedBooks) {
            recommendedBooksStyle = {}
        } else {
            recommendedBooksStyle = { display: 'none' }
        }
        if (this.state.showMyBooks) {
            myBooksStyle = {}
        } else {
            myBooksStyle = { display: 'none' }
        }
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Paper className="searchBar">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <TextField
                                hintText="Search for Title/Author"
                                floatingLabelText="Search"
                                value={this.state.searchString}
                                onChange={this.handleSearchTextChange}
                                multiLine={true}
                                fullWidth={true}
                                rows={1}
                                rowsMax={5}
                            />
                        </div>
                        <div className="col-xs-12 col-md-6 searchBarButtons">
                            <div className="col-xs-6 searchButton">
                                <SubmitButton chosenName="Search" whenClicked={this.search} />
                            </div>
                            <div className="col-xs-6 searchButton">
                                <BlueButton chosenName="Filter by Genre" whenClicked={this.handleFilterClick} />
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
                    <div onClick={this.toggleShowMyBooks} className="partitionTitile RecBooks">
                        <span>Books in your possession</span>
                    </div>
                    <div className="row" style={myBooksStyle}>
                        {this.showMyBooks()}
                    </div>
                </div>
                <div className="booksDisplayCard">
                    <div className="partitionTitile">
                        <div onClick={this.toggleShowRecommendedBooks} className="RecBooks">
                            <span>Recommended Books</span>
                        </div>
                    </div>
                    <div className="row" style={recommendedBooksStyle}>
                        {this.showFavBooks()}
                    </div>
                </div>
                <div className="booksDisplayCard">
                    <div className="partitionTitile">
                        <span>All Books / Searched Books</span>
                    </div>
                    <div className="row">
                        {this.state.books.map((book, index) => (
                            <BookCard key={index} selectedBook={book} />
                        ))}
                    </div>
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