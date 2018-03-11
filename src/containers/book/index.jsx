import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { issueBook, renewBook, returnBook, updateBookAvailability, updateBookAvailabilityOnReturn } from '../../actions/updateBook.jsx';
import config from '../../config.jsx';
import { Rating } from 'material-ui-rating';
import './book.css';

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookIssued: false,
            buttonName: "Get Book"
        }
        this.checkForIssuedBooks();
    }

    checkForIssuedBooks = () => {
        console.log(this.props.activeUser.issuedBooks)
        if (this.props.activeUser.issuedBooks.length === 0) {
            // this.setState({
            //     bookIssued: false
            // })
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
                    // this.setState({
                    //     bookIssued: false,
                    //     buttonName: "Get Book"
                    // });
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
            } else {
                alert('You can only renew the book once');
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
                        buttonName: "Request Renewal"
                    }, () => {

                        console.log("2", this.state)
                    })
                    // this.checkForIssuedBooks();
                } else {
                    alert("Book Not available")
                }
            } else {
                alert(`You have already issued ${config.allowedBookdToBorrow} books!\nPlease return a book to get this issued.`);
            }
        }
    }

    returnBook = () => {
        let dateOfReturn = new Date();
        this.props.returnBook(this.props.selectedBook, this.props.activeUser, dateOfReturn);
        let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCoppies));
        availableCopies++;
        this.props.updateBookAvailabilityOnReturn(this.props.selectedBook, this.props.activeUser, availableCopies, dateOfReturn);
        // this.setState({
        //     bookIssued: false,
        //     buttonName: "Get Book"
        // })
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

    review = () => {
        console.log("you are reviewing this book.")
    }

    print = () => {
        console.log(this.props.activeUser)
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
                        <CardTitle title={this.props.selectedBook.volumeInfo.title} subtitle={<p>Written By: <br />
                            {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                                <span key={index}><span>{author}</span><br /></span>
                            ))}</p>} />
                        <div >
                            {this.showIssuedDetails()}
                        </div>
                        <Rating
                            readOnly={true}
                            value={Math.ceil(this.props.selectedBook.volumeInfo.averageRating)}
                            max={5}
                        />
                        <SubmitButton chosenName="Review" whenClicked={this.review} />
                        <CardText>
                            {this.props.selectedBook.volumeInfo.description}
                        </CardText>
                    </div>
                </Card>
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
    updateBookAvailability: (book, user, numberOfCoppies, dateOfIssue) => dispatch(updateBookAvailability(book, user, numberOfCoppies, dateOfIssue)),
    updateBookAvailabilityOnReturn: (book, user, numberOfCoppies, dateOfReturn) => dispatch(updateBookAvailabilityOnReturn(book, user, numberOfCoppies, dateOfReturn))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Book);