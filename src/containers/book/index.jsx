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
            reviewRating: 0
        };
        this.checkForIssuedBooks();
    }

    checkForIssuedBooks = () => {
        console.log(this.props.activeUser.issuedBooks)
        if (this.props.activeUser.issuedBooks.length === 0) {
            this.setState({
                bookIssued: false
            })
            console.log("1", this.state)
        } else {
            let issueFlag = false;
            this.props.activeUser.issuedBooks.forEach((detail, index) => {
                if (detail.id === this.props.selectedBook.id) {
                    console.log("true")
                    issueFlag = true;
                    // this.state.bookIssued = true;
                    this.setState({
                        bookIssued: true,
                        buttonName: "Request Renewal"
                    }, () => {
                        console.log("3333", this.state)
                    });
                    setTimeout(() => {

                        console.log("asdasd3333", this.state)
                    }, 1000)
                    // this.chooseAction();
                    return;
                } else if (!this.state.bookIssued && index === this.props.activeUser.issuedBooks.length - 1) {
                    console.log("false")
                    issueFlag = false;
                    // this.state.bookIssued = false;
                    this.setState({
                        bookIssued: false,
                        buttonName: "Get Book"
                    });
                    console.log(this.state)
                    // this.chooseAction();
                    return;
                }
            })
            // if (issueFlag) {
            //     console.log(this.state)
            //     this.setState({
            //         bookIssued: true,
            //         buttonName: "Request Renewal"
            //     });
            //     console.log(this.state);
            //     // this.setState({
            //     //     bookIssued: true,
            //     //     buttonName: 'Request Renewal'
            //     // }, () => {
            //     //     console.log("3333", this.state)
            //     // })
            //     console.log("into true")
            // } else {
            //     this.setState({
            //         bookIssued: false,
            //         buttonName: "Get Book"
            //     })
            //     console.log("into false")
            // }
        }
    }

    // chooseAction = () => {
    //     if (this.state.bookIssued) {
    //         console.log("REQ")
    //         this.setState({
    //             buttonName: "Request Renewal"
    //         })
    //     } else {
    //         console.log("GET")
    //         this.setState({
    //             buttonName: "Get Book"
    //         })
    //     }
    // }

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
            let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCoppies));
            if (this.props.activeUser.issuedBooks.length < config.allowedBookdToBorrow) {
                if (availableCopies > 0) {
                    let dateOfIssue = new Date();
                    let dateOfReturn = new Date();
                    dateOfReturn.setDate(dateOfReturn.getDate() + config.issuePeriod);
                    this.props.issueBook(this.props.selectedBook, this.props.activeUser, dateOfIssue, dateOfReturn);
                    availableCopies--;
                    this.props.updateBookAvailability(this.props.selectedBook, this.props.activeUser, availableCopies, dateOfIssue);
                    console.log(this.state)
                    this.setState({
                        bookIssued: true,
                        buttonName: "Request Renewal",
                        showMessage: true,
                        message: "Book Issued Successfully!!!"
                    }, () => {
                        console.log("2", this.state)
                    });
                    // this.checkForIssuedBooks();
                } else {
                    this.setState({
                        showMessage: true,
                        message: "Book not available!!!"
                    });
                    // alert("Book Not available")
                }
            } else {
                this.setState({
                    showMessage: true,
                    message: `You have already issued ${config.allowedBookdToBorrow} books!\nPlease return a book to get this issued.`
                });
                // alert(`You have already issued ${config.allowedBookdToBorrow} books!\nPlease return a book to get this issued.`);
            }
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
        })
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
            })
        }
    }

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
            message: ""
        })
    }

    handleCommentChange = (event) => {
        // this.state.reviewComment = event.target.value;
        // this.forceUpdate();
        this.setState({
            reviewComment: event.target.value
        });
    }

    handleRatingChange = (rating) => {
        // this.state.reviewRating = rating;
        // this.forceUpdate();
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
            showMessage: true,
            message: "Book review saved successfully!!!"
        })
    }

    cancelRating = () => {
        this.setState({
            reviewComment: "",
            reviewRating: 0
        });
    }

    review = () => {
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
                    value={0}
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
        console.log(this.state)
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
                <SubmitButton chosenName="PRINT" whenClicked={this.print} />
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Card className="bookViewCard">
                    <div className="bookImage">
                        <img src={this.props.selectedBook.volumeInfo.imageLinks.thumbnail} alt={this.props.selectedBook.volumeInfo.title} />
                        <div>
                            <SubmitButton chosenName={this.state.buttonName} whenClicked={this.getBook} />
                            <div style={linkStyle}>
                                <CancelButton chosenName="Return Book" whenClicked={this.returnBook} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <CardTitle title={`ISBN: ${this.props.selectedBook.volumeInfo.industryIdentifiers[1].identifier}`} />
                        <CardTitle title={this.props.selectedBook.volumeInfo.title} subtitle={<p>Written By: <br />
                            {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                                <span key={index}><span>{author}</span><br /></span>
                            ))}</p>} />
                        <div >
                            {this.showIssuedDetails()}
                        </div>
                        <Rating
                            readOnly={true}
                            value={(this.props.selectedBook.volumeInfo.averageRating % Math.floor(this.props.selectedBook.volumeInfo.averageRating)) >= 0.5 ? Math.ceil(this.props.selectedBook.volumeInfo.averageRating) : Math.floor(this.props.selectedBook.volumeInfo.averageRating)}
                            max={5}
                        />
                        <Popup />
                        <CardText>
                            {this.props.selectedBook.volumeInfo.description}
                        </CardText>
                    </div>
                </Card>
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
)(Book);