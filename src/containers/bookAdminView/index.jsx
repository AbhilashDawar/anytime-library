import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import Snackbar from 'material-ui/Snackbar';
import { Rating } from 'material-ui-rating';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Popup from 'react-popup';
import Divider from 'material-ui/Divider';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import BlueButton from '../../components/bottons/blueButton.jsx';
import config from '../../config.jsx';
import './adminBookView.css';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { deleteBook } from '../../actions/book.jsx';
import { bookAction } from '../../actions/bookAction.jsx';

class BookAdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookInLibrary: false,
            showMessage: false,
            message: "",
            tableHeight: '150px'
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
            }
        };
    }

    componentDidMount = () => {
        this.checkForAvailability();

    }

    checkForAvailability = () => {
        this.props.books.forEach((book) => {
            if (this.props.selectedBook.id === book.id) {
                this.setState({
                    bookInLibrary: true
                });
                return;
            }
        });
    };

    addBook = () => {
        this.props.bookAction(true);
        this.props.history.push("/bookForm");
    }

    updateBook = () => {
        this.props.bookAction(false);
        this.props.history.push("/bookForm");
    }

    deleteConfirmation = () => {
        if (this.props.selectedBook.libraryInfo.issuedTo.length > 0) {
            this.setState({
                showMessage: true,
                message: "Isseud Book cannot be deleted..."
            });
        } else {
            Popup.create({
                title: this.props.selectedBook.volumeInfo.title,
                content: <div>
                    Are you sure you want to delete the book?
            </div>,
                buttons: {
                    right: [{
                        text: 'Cancel',
                        className: 'danger',
                        action: () => {
                            Popup.close();
                        }
                    }, {
                        text: 'Delete',
                        className: 'success',
                        action: () => {
                            this.deleteBook();
                            Popup.close();
                        }
                    }]
                }
            });
        }
    };

    deleteBook = () => {
        this.props.deleteBook(this.props.selectedBook);
        setTimeout(() => {
            this.props.history.push("/admin");
        }, 2000);
        setTimeout(() => {
            this.setState({
                showMessage: true,
                message: "Book Deleted Successfully!!!"
            });
        }, 1000);
        this.setState({
            showMessage: true,
            message: "Deleting Book... Please wait"
        });

    }

    showAuthors = () => {
        if (this.props.selectedBook.volumeInfo.authors) {
            return <p>Written By: <br />
                {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                    <span key={index}><span>{author}</span><br /></span>
                ))}
            </p>
        } else {
            return <p style={{ color: 'red' }}>Author not available
            </p>
        }
    };

    showIssuedDetails = () => {
        if (this.state.bookInLibrary) {
            if (this.props.selectedBook.libraryInfo.issuedTo.length > 0) {
                return <Table
                    height={this.state.tableHeight}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
                                Book Issued to List
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>Issued To</TableHeaderColumn>
                            <TableHeaderColumn>Issued On</TableHeaderColumn>
                            <TableHeaderColumn>Expected Return</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.props.selectedBook.libraryInfo.issuedTo.map((detail, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{detail.user.username}</TableRowColumn>
                                <TableRowColumn>{detail.dateOfIssue.getDate()}/{detail.dateOfIssue.getMonth() + 1}/{detail.dateOfIssue.getFullYear()}</TableRowColumn>
                                <TableRowColumn>{detail.expectedReturnDate.getDate()}/{detail.expectedReturnDate.getMonth() + 1}/{detail.expectedReturnDate.getFullYear()}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        }
    };

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
            message: ""
        });
    };

    render() {
        var addStyle, deleteStyle;
        if (this.state.bookInLibrary) {
            addStyle = { display: 'none' }
            deleteStyle = { display: 'inline' }
        } else {
            addStyle = { display: 'inline' }
            deleteStyle = { display: 'none' }
        }
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Card className="adminBookViewCard">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="row bookImage">
                                <img src={this.props.selectedBook.volumeInfo.imageLinks.thumbnail} alt={this.props.selectedBook.volumeInfo.title} />
                            </div>
                            <div className="row">
                                <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2" style={addStyle}>
                                    <SubmitButton chosenName="Add To Library" whenClicked={this.addBook} />
                                </div>
                                <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1" style={deleteStyle}>
                                    <BlueButton chosenName="Update Book" whenClicked={this.updateBook} />
                                    <CancelButton chosenName="Delete Book" whenClicked={this.deleteConfirmation} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                            <div className="row">
                                <CardTitle title={`ISBN: ${this.props.selectedBook.volumeInfo.industryIdentifiers[1] ? this.props.selectedBook.volumeInfo.industryIdentifiers[1].identifier : ""}`} />
                            </div>
                            <Divider />
                            <div className="row">
                                <CardTitle title={this.props.selectedBook.volumeInfo.title} subtitle={this.showAuthors()} />
                            </div>
                            <Divider />
                            <div className="row">
                                <div className="row">
                                    <CardText>
                                        <span>Average Ratings: {this.props.selectedBook.volumeInfo.averageRating}</span>
                                        <br />
                                        <span>Total Ratings: {this.props.selectedBook.volumeInfo.ratingsCount}</span>
                                    </CardText>
                                </div>
                                <br />
                                <div className="row">
                                    <Rating
                                        readOnly={true}
                                        value={(this.props.selectedBook.volumeInfo.averageRating % Math.floor(this.props.selectedBook.volumeInfo.averageRating)) >= 0.5 ? Math.ceil(this.props.selectedBook.volumeInfo.averageRating) : Math.floor(this.props.selectedBook.volumeInfo.averageRating)}
                                        max={5}
                                    />
                                </div>
                            </div>
                            <Divider />
                            <div className="row">
                                <CardText>
                                    {this.props.selectedBook.volumeInfo.description}
                                </CardText>
                            </div>
                            <div className="row">
                                {this.showIssuedDetails()}
                            </div>
                        </div>
                    </div>
                </Card>
                <Popup />
                <Snackbar
                    open={this.state.showMessage}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        books: state.books,
        selectedBook: state.selectedBook
    };
};

const mapDispatchToProps = dispatch => ({
    deleteBook: (book) => dispatch(deleteBook(book)),
    bookAction: (value) => dispatch(bookAction(value))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookAdminView));