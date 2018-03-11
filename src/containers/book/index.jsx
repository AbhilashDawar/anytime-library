import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { issueBook, returnBook, updateBookAvailability, updateBookAvailabilityOnReturn } from '../../actions/updateBook.jsx';
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
            this.setState({
                bookIssued: false
            })
        } else {
            this.props.activeUser.issuedBooks.forEach((detail, index) => {
                if (detail.id === this.props.selectedBook.id) {
                    this.setState({
                        bookIssued: true
                    })
                    return;
                } else if (!this.state.bookIssued && index === this.props.activeUser.issuedBooks.length - 1) {
                    this.setState({
                        bookIssued: false
                    })
                    return;
                }
            });
        }
        this.chooseAction();
    }

    chooseAction = () => {
        if (this.state.bookIssued) {
            this.setState({
                buttonName: "Request Renewal"
            })
        } else {
            this.setState({
                buttonName: "Get Book"
            })
        }
    }

    getBook = () => {
        if (this.state.bookIssued) {

        } else {
            let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCoppies));
            if (availableCopies > 0) {
                let dateOfIssue = new Date();
                let dateOfReturn = dateOfIssue;
                dateOfReturn.setDate(dateOfReturn.getDate() + config.issuePeriod);
                this.props.issueBook(this.props.selectedBook, this.props.activeUser, dateOfIssue, dateOfReturn);
                availableCopies--;
                this.props.updateBookAvailability(this.props.selectedBook, this.props.activeUser, availableCopies);
                this.setState({
                    bookIssued: true
                })
                this.checkForIssuedBooks();
            } else {
                alert("Book Not available")
            }
        }
    }

    returnBook = () => {
        let dateOfReturn = new Date();
        this.props.returnBook(this.props.selectedBook, this.props.activeUser, dateOfReturn);
        let availableCopies = JSON.parse(JSON.stringify(this.props.selectedBook.libraryInfo.numberOfCoppies));
        availableCopies++;
        this.props.updateBookAvailabilityOnReturn(this.props.selectedBook, this.props.activeUser, availableCopies);
        this.setState({
            bookIssued: false
        })
        this.checkForIssuedBooks();
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
    returnBook: (book, user, dateOfReturn) => dispatch(returnBook(book, user, dateOfReturn)),
    updateBookAvailability: (book, user, numberOfCoppies) => dispatch(updateBookAvailability(book, user, numberOfCoppies)),
    updateBookAvailabilityOnReturn: (book, user, numberOfCoppies) => dispatch(updateBookAvailabilityOnReturn(book, user, numberOfCoppies))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Book);