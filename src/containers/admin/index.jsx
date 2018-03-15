import React from 'react';
import { connect } from 'react-redux';
// import CancelButton from '../bottons/cancelButton.jsx';
// import SubmitButton from '../bottons/submitButton.jsx';
import Header from '../../components/header/header';
import InfoBox from '../../components/infoBox';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Book from 'material-ui/svg-icons/action/book';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import axios from 'axios';
import './admin.css';
import BookCard from '../../components/bookCard';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: this.props.books,
            searchString: "",
            criteria: 1,
            differentBooks: 0,
            totalBooks: 0,
            booksIssued: 0
        };
    }

    componentDidMount = () => {
        this.fetchTotalBooks();
    };

    fetchTotalBooks = () => {
        let totalNumberOfBooks = 0;
        let issuedBooks = 0;
        this.props.books.forEach((book) => {
            totalNumberOfBooks += book.libraryInfo.numberOfCoppies;
            issuedBooks += book.libraryInfo.issuedTo.length;
        });
        this.setState({
            differentBooks: this.props.books.length,
            totalBooks: totalNumberOfBooks,
            booksIssued: issuedBooks
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

    search = () => {
        if (this.state.criteria === 1) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.searchString}`)
                .then((response) => {
                    this.setState({ books: response.data.items });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (this.state.criteria === 2) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=title=${this.state.searchString}`)
                .then((response) => {
                    this.setState({ books: response.data.items });
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
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={LibraryBooks}
                                color={pink600}
                                title="Different Books"
                                value={this.state.differentBooks}
                            />
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={LibraryBooks}
                                color={cyan600}
                                title="Total Number Of Books"
                                value={this.state.totalBooks}
                            />
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 ">
                            <InfoBox
                                Icon={Book}
                                color={purple600}
                                title="Issued Books"
                                value={this.state.booksIssued}
                            />
                        </div>
                    </div>
                    <Card>
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
                            {this.state.books.map((book, index) => (
                                <BookCard key={index} selectedBook={book} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser,
        users: state.users,
        books: state.books
    };
}

export default connect(mapStateToProps)(Admin);