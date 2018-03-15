import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField/TextField';
import Snackbar from 'material-ui/Snackbar';
import { Rating } from 'material-ui-rating';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { issueBook, renewBook, returnBook, reviewBook, updateBookAvailability, updateBookAvailabilityOnReturn } from '../../actions/updateBook.jsx';
import config from '../../config.jsx';
// import './book.css';

class BookAdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookIssued: false,
            buttonName: "Get Book",
            showMessage: false,
            message: "",
            reviewComment: "",
            reviewRating: 0
        };
    }

    componentDidMount = () => {
        // this.checkForIssuedBooks();

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


    returnBook = () => {
        let dateOfReturn = new Date();
        this.props.returnBook(this.props.selectedBook, this.props.activeUser, dateOfReturn);
        let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCoppies));
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

    showIssuedDetails = () => {
        if (this.state.bookIssued) {
            this.props.activeUser.issuedBooks.forEach((book) => {
                if (book.id === this.props.selectedBook.id) {
                    return (
                        <CardText>
                            <span>Issued On: {book.dateOfIssue}</span>
                            <span>Due to Return On: {book.dateOfReturn}</span>
                        </CardText>
                    )
                }
            });
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
        }, () => {
            console.log("C")
        });
    }

    handleRatingChange = (rating) => {
        this.setState({
            reviewRating: rating
        }, () => {
            console.log("R")
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
            message: "Book review saved successfully!!!"
        });
    }

    cancelRating = () => {
        this.setState({
            reviewComment: "",
            reviewRating: 0
        });
    }

    review = () => {
        console.log(this.state)
        Popup.create({
            title: this.props.selectedBook.volumeInfo.title,
            content: <div>
                <TextField
                    hintText="Comments"
                    floatingLabelText="Comments (optional)"
                    value={this.state.reviewComment}
                    onChange={this.handleCommentChange}
                    multiLine={true}
                    rows={1}
                    rowsMax={5}
                />
                <br />
                <Rating
                    value={this.state.reviewRating}
                    max={5}
                    onChange={this.handleRatingChange}
                />
            </div>,
            buttons: {
                right: [{
                    text: 'Cancel',
                    className: 'danger',
                    action: () => {
                        this.cancelRating();
                        Popup.close();
                    }
                }, {
                    text: 'Save',
                    className: 'success',
                    action: () => {
                        this.saveRating();
                        Popup.close();
                    }
                }]
            }
        });
    }

    print = () => {
        console.log(this.state);
    }

    render() {
        var linkStyle;
        if (this.state.bookIssued) {
            linkStyle = { display: 'inline' }
        } else {
            linkStyle = { display: 'none' }
        }
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
               THis is admin view
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
    updateBookAvailability: (book, user, numberOfCoppies, dateOfIssue) => dispatch(updateBookAvailability(book, user, numberOfCoppies, dateOfIssue)),
    updateBookAvailabilityOnReturn: (book, user, numberOfCoppies, dateOfReturn) => dispatch(updateBookAvailabilityOnReturn(book, user, numberOfCoppies, dateOfReturn))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookAdminView);