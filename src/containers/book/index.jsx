import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import { Rating } from 'material-ui-rating';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { issueBook, renewBook, returnBook, reviewBook, updateBookAvailability, updateBookAvailabilityOnReturn } from '../../actions/updateBook.jsx';
import config from '../../config.jsx';
import './book.css';

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookIssued: false,
            buttonName: "Get Book",
            showMessage: false,
            message: "",
            reviewComment: "",
            reviewRating: 0,
            openDialog: false
        };
    }

    componentDidMount = () => {
        this.checkForIssuedBooks();

    }

    checkForIssuedBooks = () => {
        if (this.props.activeUser.issuedBooks.length === 0) {
            this.setState({
                bookIssued: false
            })
        } else {
            let issueFlag = false;
            this.props.activeUser.issuedBooks.forEach((detail, index) => {
                if (detail.id === this.props.selectedBook.id) {
                    issueFlag = true;
                    this.setState({
                        bookIssued: true,
                        buttonName: "Request Renewal"
                    });
                    return;
                } else if (!issueFlag && index === this.props.activeUser.issuedBooks.length - 1) {
                    issueFlag = false;
                    this.setState({
                        bookIssued: false,
                        buttonName: "Get Book"
                    });
                    return;
                }
            });
        }
    }

    getBook = () => {
        if (this.state.bookIssued) {
            let originalDateOfReturn;
            let bookAlreadyRenewed;
            this.props.activeUser.issuedBooks.forEach((book) => {
                if (book.id === this.props.selectedBook.id) {
                    originalDateOfReturn = book.dateOfReturn;
                    bookAlreadyRenewed = book.renewed;
                    return;
                }
            })
            if (!bookAlreadyRenewed) {
                originalDateOfReturn.setDate(originalDateOfReturn.getDate() + config.issuePeriod);
                this.props.renewBook(this.props.selectedBook, this.props.activeUser, originalDateOfReturn);
                this.setState({
                    showMessage: true,
                    message: "Book Renewed Successfully!!!"
                });
            } else {
                this.setState({
                    showMessage: true,
                    message: "You can only renew the book once!!!"
                });
            }
        } else {
            let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCopies));
            if (this.props.activeUser.issuedBooks.length < config.allowedBookdToBorrow) {
                if (availableCopies > 0) {
                    let dateOfIssue = new Date();
                    let dateOfReturn = new Date();
                    dateOfReturn.setDate(dateOfReturn.getDate() + config.issuePeriod);
                    this.props.issueBook(this.props.selectedBook, this.props.activeUser, dateOfIssue, dateOfReturn);
                    let expectedReturnDate = dateOfReturn;
                    availableCopies--;
                    this.props.updateBookAvailability(this.props.selectedBook, this.props.activeUser, availableCopies, dateOfIssue, expectedReturnDate);
                    this.setState({
                        bookIssued: true,
                        buttonName: "Request Renewal",
                        showMessage: true,
                        message: "Book Issued Successfully!!!"
                    });
                    // this.checkForIssuedBooks();
                } else {
                    this.setState({
                        showMessage: true,
                        message: "Book not available!!!"
                    });
                }
            } else {
                this.setState({
                    showMessage: true,
                    message: `You have already issued ${config.allowedBookdToBorrow} books!\nPlease return a book to get this issued.`
                });
            }
        }
    }

    returnBook = () => {
        let dateOfReturn = new Date();
        this.props.returnBook(this.props.selectedBook, this.props.activeUser, dateOfReturn);
        let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCopies));
        availableCopies++;
        this.props.updateBookAvailabilityOnReturn(this.props.selectedBook, this.props.activeUser, availableCopies, dateOfReturn);
        this.setState({
            bookIssued: false,
            buttonName: "Get Book",
            showMessage: true,
            message: "Book returned successfully!!!"
        });
        // let userGivenReview = false;
        // if (this.props.selectedBook.libraryInfo.reviews.length === 0) {
        this.review();
        // } else {
        //     this.props.selectedBook.libraryInfo.reviews.forEach((r, index) => {
        //         if (r.user.username === this.props.activeUser.username) {
        //             userGivenReview = true;
        //             return;
        //         } else if (!userGivenReview && index === this.props.selectedBook.libraryInfo.reviews.length - 1) {
        //             this.review();
        //         }
        //     })
        // }
        // this.checkForIssuedBooks();
    }

    showIssuedDetails = (bookIssued) => {
        if (bookIssued) {
            return { display: 'inline' }
        } else {
            return { display: 'none' }
        }
    }

    displayGivenRating = () => {
        if (this.props.selectedBook.libraryInfo.reviews.length > 0) {
            return { display: 'inline' }
        } else {
            return { display: 'none' }
        }
    }

    displayGivenRatingMessage = () => {
        if (this.props.selectedBook.libraryInfo.reviews.length === 0) {
            return { display: 'inline' }
        } else {
            return { display: 'none' }
        }
    }

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
            message: ""
        });
    }

    handleCommentChange = (event) => {
        this.setState({
            reviewComment: event.target.value
        });
    }

    handleRatingChange = (rating) => {
        this.setState({
            reviewRating: rating
        });
    }

    saveRating = () => {
        let review = {
            comments: this.state.reviewComment,
            rating: this.state.reviewRating
        }
        this.props.reviewBook(this.props.selectedBook, this.props.activeUser, review);
        this.setState({
            reviewComment: "",
            reviewRating: 0,
            showMessage: true,
            message: "Book review saved successfully!!!",
            openDialog: false
        });
    }

    cancelRating = () => {
        this.setState({
            reviewComment: "",
            reviewRating: 0,
            openDialog: false
        });
    }

    review = () => {
        this.setState({ openDialog: true });
    }

    yourRating = () => {
        if (this.props.selectedBook.libraryInfo.reviews.length > 0) {
            // eslint-disable-next-line
            this.props.selectedBook.libraryInfo.reviews.map((review, index) => {
                if (review.user.username === this.props.activeUser.username) {
                    return <span key={index}><span>Your Ratings: {review.rating}</span>
                        <br />
                        <span>Your Comments: {review.comments}</span>
                    </span>
                }
            });
        } else {
            return <span>
                You have not yet rated this book.
            </span>
        }
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

    render() {
        var linkStyle;
        if (this.state.bookIssued) {
            linkStyle = { display: 'inline' }
        } else {
            linkStyle = { display: 'none' }
        }
        let actions = [
            <FlatButton
                label="Save"
                primary={true}
                onClick={this.saveRating}
            />,
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.cancelRating}
            />
        ];
        return (
            <div>
                {/* <SubmitButton chosenName="PRINT" whenClicked={this.print} /> */}
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Card className="bookViewCard">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="row bookImage">
                                <img src={this.props.selectedBook.volumeInfo.imageLinks.thumbnail} alt={this.props.selectedBook.volumeInfo.title} />
                            </div>
                            <div className="row">
                                <SubmitButton chosenName={this.state.buttonName} whenClicked={this.getBook} />
                                <div style={linkStyle}>
                                    <CancelButton chosenName="Return Book" whenClicked={this.returnBook} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                            <div className="row">
                                <CardTitle title={`ISBN: ${this.props.selectedBook.volumeInfo.industryIdentifiers[1].identifier}`} />
                            </div>
                            <Divider />
                            <div className="row">
                                <CardTitle title={this.props.selectedBook.volumeInfo.title} subtitle={this.showAuthors()} />
                                {/* <CardTitle title={this.props.selectedBook.volumeInfo.title} subtitle={<p>Written By: <br />
                                    {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                                        <span key={index}><span>{author}</span><br /></span>
                                    ))}</p>} /> */}
                            </div>
                            <Divider />
                            <div className="row">
                                <div className="row">
                                    <CardText>
                                        <span><b>Average Ratings:</b> {this.props.selectedBook.volumeInfo.averageRating}</span>
                                        <br />
                                        <span><b>Total Ratings:</b> {this.props.selectedBook.volumeInfo.ratingsCount}</span>
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
                                <div className="row">
                                    <div style={this.displayGivenRating()}>
                                        <CardText>
                                            {this.props.selectedBook.libraryInfo.reviews.map((review, index) => {
                                                if (review.user.username === this.props.activeUser.username) {
                                                    return <span key={index}><span><b>Your Ratings:</b> {review.rating}</span>
                                                        <br />
                                                        <span><b>Your Comments:</b> {review.comments}</span>
                                                    </span>
                                                }
                                            })}
                                        </CardText>
                                    </div>
                                    <div style={this.displayGivenRatingMessage()}>
                                        <CardText>
                                            <span>
                                                You have not yet rated this book.
                                            </span>
                                        </CardText>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="row">
                                <div className="row" style={this.showIssuedDetails(this.state.bookIssued)}>
                                    {this.props.activeUser.issuedBooks.map((book, index) => {
                                        if (book.id === this.props.selectedBook.id) {
                                            return <CardText key={index}>
                                                <span><b>Issued On:</b> {book.dateOfIssue.getDate()}/{book.dateOfIssue.getMonth() + 1}/{book.dateOfIssue.getFullYear()}</span>
                                                <br />
                                                <span><b>Due to Return On:</b> {book.dateOfReturn.getDate()}/{book.dateOfReturn.getMonth() + 1}/{book.dateOfReturn.getFullYear()}</span>
                                            </CardText>
                                        }
                                    })}
                                </div>
                                <div className="row" style={this.showIssuedDetails(!this.state.bookIssued)}>
                                    <CardText>
                                        <span><b>Book not Issued</b></span>
                                    </CardText>
                                </div>
                            </div>
                            <Divider />
                            <div className="row">
                                <CardText>
                                    <b>Description:</b> &nbsp;&nbsp;
                                    {this.props.selectedBook.volumeInfo.description}
                                </CardText>
                            </div>
                        </div>
                    </div>
                </Card>
                <Dialog
                    title={this.props.selectedBook.volumeInfo.title}
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.cancelRating}
                >
                    <div className="row">
                        <TextField
                            hintText="Comments"
                            floatingLabelText="Comments (optional)"
                            value={this.state.reviewComment}
                            onChange={this.handleCommentChange}
                            multiLine={true}
                            fullWidth={true}
                            rows={1}
                            rowsMax={5}
                        />
                    </div>
                    <div className="row">
                        Please rate the book:
                        <Rating
                            value={this.state.reviewRating}
                            max={5}
                            onChange={this.handleRatingChange}
                        />
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.showMessage}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        selectedBook: state.selectedBook
    };
};

const mapDispatchToProps = dispatch => ({
    issueBook: (book, user, dateOfIssue, dateOfReturn) => dispatch(issueBook(book, user, dateOfIssue, dateOfReturn)),
    renewBook: (book, user, dateOfReturn) => dispatch(renewBook(book, user, dateOfReturn)),
    returnBook: (book, user, dateOfReturn) => dispatch(returnBook(book, user, dateOfReturn)),
    reviewBook: (book, user, review) => dispatch(reviewBook(book, user, review)),
    updateBookAvailability: (book, user, numberOfCopies, dateOfIssue, expectedReturnDate) => dispatch(updateBookAvailability(book, user, numberOfCopies, dateOfIssue, expectedReturnDate)),
    updateBookAvailabilityOnReturn: (book, user, numberOfCopies, dateOfReturn) => dispatch(updateBookAvailabilityOnReturn(book, user, numberOfCopies, dateOfReturn))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Book);