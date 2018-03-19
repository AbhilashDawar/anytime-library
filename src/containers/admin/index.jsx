import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Book from 'material-ui/svg-icons/action/book';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { cyan600, pink600, purple600 } from 'material-ui/styles/colors';

import Header from '../../components/header/header';
import InfoBox from '../../components/infoBox';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { selectBook } from '../../actions/selectBook.jsx';
import './admin.css';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: this.props.books,
            isSearching: false,
            searchString: "",
            criteria: 1,
            differentBooks: 0,
            totalBooks: 0,
            booksIssued: 0,
            tableHeight: '300px'
        };
        this.styles = {
            search: {
                ISBN: {
                    width: '20%'
                },
                Title: {
                    width: '40%'
                },
                Publisher: {
                    width: '20%'
                }
            },
            normal: {
                ISBN: {
                    width: '15%'
                },
                Title: {
                    width: '15%'
                },
                Total: {
                    width: '10%'
                },
                Number: {
                    width: '10%'
                },
                Issued: {
                    width: '15%'
                },
                Date: {
                    width: '10%'
                },
                Expected: {
                    width: '10%'
                }
            }
        }
    }

    componentDidMount = () => {
        this.fetchTotalBooks();
    };

    fetchTotalBooks = () => {
        let totalNumberOfBooks = 0;
        let issuedBooks = 0;
        this.props.books.forEach((book) => {
            totalNumberOfBooks += book.libraryInfo.numberOfCopies;
            issuedBooks += book.libraryInfo.issuedTo.length;
        });
        this.setState({
            differentBooks: this.props.books.length,
            totalBooks: totalNumberOfBooks,
            booksIssued: issuedBooks
        });
    };

    getAllBooks = () => {
        this.setState({
            books: this.props.books,
            isSearching: false
        });
    };

    getIssuedBooks = () => {
        let issuedBooks = [];
        this.props.books.forEach((book) => {
            if (book.libraryInfo.issuedTo.length > 0) {
                issuedBooks.push(book);
            }
        });
        this.setState({
            books: issuedBooks,
            isSearching: false
        });
    }

    handleSearchTextChange = (event) => {
        this.setState({
            searchString: event.target.value
        });
    };

    handleCriteriaChange = (event, index, value) => {
        this.setState({
            criteria: value
        });
    };

    rowSelected = (rowIndex) => {
        this.props.selectBook(this.state.books[rowIndex]);
        this.props.history.push("/adminBookView");
    };

    showSearch = () => {
        this.setState({
            isSearching: true,
            books: []
        });
    }

    booksDisplay = () => {
        if (this.state.isSearching) {
            return <div>
                <div className="row">
                    <SelectField
                        floatingLabelText="Search Criteria"
                        value={this.state.criteria}
                        onChange={this.handleCriteriaChange}
                    >
                        <MenuItem value={1} primaryText="ISBN" />
                        <MenuItem value={2} primaryText="Title" />
                    </SelectField>
                    <div className="col-xs-6">
                        <TextField
                            hintText="Search for ISBN"
                            floatingLabelText="Search"
                            value={this.state.searchString}
                            onChange={this.handleSearchTextChange}
                            multiLine={true}
                            rows={1}
                            rowsMax={5}
                        />
                    </div>
                    <div className="searchButtom">
                        <SubmitButton chosenName="Search" whenClicked={this.search} />
                    </div>
                </div>
                <hr />
                <div className="row">
                    {this.displaySearchResults()}
                </div>
            </div >
        } else {
            return this.displayTable();
        }
    }

    displaySearchResults = () => {
        return (<Table
            height={this.state.tableHeight}
            onRowSelection={this.rowSelected}
        >
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
                        List Of Books
                    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn style={this.styles.search.ISBN} tooltip="ISBN">ISBN</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.search.Title} tooltip="Title">Title</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.search.Publisher} tooltip="Publisher">Publisher</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {this.showSearchedBooks()}
                {/* {this.state.books.map((book, index) => (
                <BookCard key={index} selectedBook={book} />
            ))} */}
            </TableBody>
        </Table>);
    }

    showSearchedBooks = () => {
        if (this.state.books.length === 0) {
            return <TableRow>
                <TableRowColumn>NO BOOKS TO SHOW</TableRowColumn>
            </TableRow>
        } else {
            return this.state.books.map((book, index) => (
                <TableRow key={index}>
                    <TableRowColumn style={this.styles.search.ISBN}>{book.volumeInfo.industryIdentifiers[1] ? book.volumeInfo.industryIdentifiers[1].identifier : ""}</TableRowColumn>
                    <TableRowColumn style={this.styles.search.Titile}>{book.volumeInfo.title}</TableRowColumn>
                    <TableRowColumn style={this.styles.search.Publisher}>{book.volumeInfo.publisher}</TableRowColumn>
                </TableRow>
            ));
        }
    };

    displayTable = () => {
        return (<Table
            height={this.state.tableHeight}
            onRowSelection={this.rowSelected}
        >
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
                        List Of Books
                    </TableHeaderColumn>
                </TableRow>
                <TableRow>
                    <TableHeaderColumn style={this.styles.normal.ISBN} tooltip="ISBN">ISBN</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Title} tooltip="Title">Title</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Total} tooltip="Total Copies">Total Copies</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Number} tooltip="Number of Copies Issued">Number of Copies Issued</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Issued} tooltip="Issued to">Issued to</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Date} tooltip="Date Issued">Date Issued</TableHeaderColumn>
                    <TableHeaderColumn style={this.styles.normal.Expected} tooltip="Expected Date of Return">Expected Date of Return</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {this.showBooks()}
                {/* {this.state.books.map((book, index) => (
                <BookCard key={index} selectedBook={book} />
            ))} */}
            </TableBody>
        </Table>);
    }

    showBooks = () => {
        if (this.state.books.length === 0) {
            return <TableRow>
                <TableRowColumn>NO BOOKS TO SHOW</TableRowColumn>
            </TableRow>
        } else {
            return this.state.books.map((book, index) => (
                <TableRow key={index}>
                    <TableRowColumn style={this.styles.normal.ISBN}>{book.volumeInfo.industryIdentifiers[1].identifier}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Title} tooltip={book.volumeInfo.title}>{book.volumeInfo.title}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Total}>{book.libraryInfo.numberOfCopies + book.libraryInfo.issuedTo.length}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Number}>{book.libraryInfo.issuedTo.length}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Issued}>{book.libraryInfo.issuedTo.map((detail, index) => (
                        <span key={index}>
                            <span>{detail.user.username}</span>
                            <br />
                        </span>
                    ))}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Date}>{book.libraryInfo.issuedTo.map((detail, index) => (
                        <span key={index}>
                            <span>{detail.dateOfIssue.getDate()}/{detail.dateOfIssue.getMonth() + 1}/{detail.dateOfIssue.getFullYear()}</span>
                            <br />
                        </span>
                    ))}</TableRowColumn>
                    <TableRowColumn style={this.styles.normal.Expected}>{book.libraryInfo.issuedTo.map((detail, index) => (
                        <span key={index}>
                            <span>{detail.expectedReturnDate.getDate()}/{detail.expectedReturnDate.getMonth() + 1}/{detail.expectedReturnDate.getFullYear()}</span>
                            <br />
                        </span>
                    ))}</TableRowColumn>
                </TableRow>
            ));
        }
    };

    search = () => {
        if (this.state.criteria === 1) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.searchString}`)
                .then((response) => {
                    if (response.data.totalItems > 0) {
                        this.setState({
                            books: response.data.items
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (this.state.criteria === 2) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=title=${this.state.searchString}`)
                .then((response) => {
                    if (response.data.totalItems > 0) {
                        this.setState({
                            books: response.data.items
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <div className="adminContainer">
                    <div className="row">
                        <div onClick={this.getAllBooks} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={LibraryBooks}
                                color={pink600}
                                title="Different Books"
                                value={this.state.differentBooks}
                            />
                        </div>

                        <div onClick={this.getAllBooks} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={LibraryBooks}
                                color={cyan600}
                                title="Total Number Of Books"
                                value={this.state.totalBooks}
                            />
                        </div>

                        <div onClick={this.getIssuedBooks} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={Book}
                                color={purple600}
                                title="Issued Books"
                                value={this.state.booksIssued}
                            />
                        </div>

                        <div onClick={this.showSearch} className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={LibraryBooks}
                                color={purple600}
                                title="Search for new Books"
                            />
                        </div>
                    </div>
                    <Card>
                        <div className="row">
                            {this.booksDisplay()}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        users: state.users,
        books: state.books
    };
};

const mapDispatchToProps = dispatch => ({
    selectBook: (book) => dispatch(selectBook(book))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Admin));