import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import { grey400 } from 'material-ui/styles/colors';

import PageBase from '../../components/pageBase';
import Header from '../../components/header/header';
import CancelButton from '../../components/bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { addBook, updateBook } from '../../actions/book.jsx';

class BookForm extends React.Component {

    constructor(props) {
        super(props);

        // Checking all the required Feilds from recieved data
        let title = "",
            titleAvailable = false,
            authors = [],
            authorsAvailable = false,
            publisher = "",
            publisherAvailable = false,
            description = "",
            descriptionAvailable = false,
            industryIdentifiers = [{
                "type": "ISBN_10",
                "identifier": "xxxxxxxxxx"
            }, {
                "type": "ISBN_13",
                "identifier": "XXXXXXXXXXXXX"
            }],
            identifiersAvailable = false,
            categories = [],
            categoriesAvailable = false,
            averageRating = 0,
            ratingsCount = 0,
            imageLinks = {
                thumbnail: ""
            },
            imageLinksAvailable = false,
            numberOfCopies = 0;
        if (this.props.selectedBook.libraryInfo) {
            numberOfCopies = this.props.selectedBook.libraryInfo.numberOfCopies;
            numberOfCopies += this.props.selectedBook.libraryInfo.issuedTo.length;
        }
        if (this.props.selectedBook.volumeInfo) {
            if (this.props.selectedBook.volumeInfo.title) {
                title = this.props.selectedBook.volumeInfo.title;
                titleAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.authors) {
                authors = this.props.selectedBook.volumeInfo.authors;
                authorsAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.publisher) {
                publisher = this.props.selectedBook.volumeInfo.publisher;
                publisherAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.description) {
                description = this.props.selectedBook.volumeInfo.description;
                descriptionAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.industryIdentifiers[1]) {
                industryIdentifiers = this.props.selectedBook.volumeInfo.industryIdentifiers;
                identifiersAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.categories) {
                categories = this.props.selectedBook.volumeInfo.categories;
                categoriesAvailable = true;
            }
            if (this.props.selectedBook.volumeInfo.averageRating) {
                averageRating = this.props.selectedBook.volumeInfo.averageRating;
            }
            if (this.props.selectedBook.volumeInfo.ratingsCount) {
                ratingsCount = this.props.selectedBook.volumeInfo.ratingsCount;
            }
            if (this.props.selectedBook.volumeInfo.imageLinks) {
                imageLinks = this.props.selectedBook.volumeInfo.imageLinks;
                imageLinksAvailable = true;
            }
        }
        let authorsValue = "";
        authors.forEach((author, index) => {
            if (index === authors.length - 1) {
                authorsValue += author;
            } else {
                authorsValue += `${author},`;
            }
        });
        let categoriesValue = "";
        categories.forEach((category, index) => {
            if (index === authors.length - 1) {
                categoriesValue += category;
            } else {
                categoriesValue += `${category},`;
            }
        });
        let isbnValue = industryIdentifiers[1].identifier;
        let imageLinksValue = imageLinks.thumbnail;

        // Setting up the Button Name
        let buttonName = "",
            pageTitle = "";
        if (this.props.addingBook) {
            pageTitle = "Add Book";
            buttonName = "Add To Library";
        } else {
            pageTitle = "Update Book";
            buttonName = "Update Book";
        }

        this.state = {
            title: title,
            titleAvailable: titleAvailable,
            authors: authors,
            authorsAvailable: authorsAvailable,
            publisher: publisher,
            publisherAvailable: publisherAvailable,
            description: description,
            descriptionAvailable: descriptionAvailable,
            industryIdentifiers: industryIdentifiers,
            identifiersAvailable: identifiersAvailable,
            categories: categories,
            categoriesAvailable: categoriesAvailable,
            averageRating: averageRating,
            ratingsCount: ratingsCount,
            imageLinks: imageLinks,
            imageLinksAvailable: imageLinksAvailable,
            // eslint-disable-next-line
            numberOfCopies: parseInt(numberOfCopies),
            authorsValue: authorsValue,
            isbnValue: isbnValue,
            imageLinksValue: imageLinksValue,
            categoriesValue: categoriesValue,
            showMessage: false,
            message: "",
            pageTitle: pageTitle,
            buttonName: buttonName
        };
        this.styles = {
            toggleDiv: {
                maxWidth: 300,
                marginTop: 40,
                marginBottom: 5
            },
            toggleLabel: {
                color: grey400,
                fontWeight: 100
            },
            buttons: {
                marginTop: 30,
                float: 'right'
            },
            saveButton: {
                marginLeft: 5
            }
        };
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleAuthorChange = (event) => {
        this.setState({
            authorsValue: event.target.value
        });
    }

    handlePublisherChange = (event) => {
        this.setState({
            publisher: event.target.value
        });
    }

    handleDescritionChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    handleISBNChange = (event) => {
        this.setState({
            isbnValue: event.target.value
        });
    }

    handleCategoriesChange = (event) => {
        this.setState({
            categoriesValue: event.target.value
        });
    }

    handleImageLinksChange = (event) => {
        this.setState({
            imageLinksValue: event.target.value
        });
    }

    handlenNumberOfCopiesChange = (event) => {
        this.setState({
            numberOfCopies: event.target.value
        });
    }

    action = () => {
        // Setting up the book object
        let book = this.props.selectedBook;
        book.volumeInfo.title = this.state.title;
        let authors = this.state.authorsValue.split(',');
        book.volumeInfo.authors = authors;
        book.volumeInfo.publisher = this.state.publisher;
        book.volumeInfo.description = this.state.description;
        book.volumeInfo.industryIdentifiers = this.state.industryIdentifiers;
        book.volumeInfo.industryIdentifiers[1].identifier = this.state.isbnValue;
        let categories = this.state.categoriesValue.split(',');
        book.volumeInfo.categories = categories;
        book.volumeInfo.imageLinks = this.state.imageLinks;
        book.volumeInfo.imageLinks.thumbnail = this.state.imageLinksValue;
        book.volumeInfo.averageRating = this.state.averageRating;
        book.volumeInfo.ratingsCount = this.state.ratingsCount;

        // Calling the actions
        if (this.props.addingBook) {
            book["libraryInfo"] = {
                // eslint-disable-next-line
                "numberOfCopies": parseInt(this.state.numberOfCopies),
                "issuedTo": [],
                "issuedHistory": [],
                "reviews": []
            };
            this.props.addBook(book);
            this.setState({
                showMessage: true,
                message: "Adding Book..."
            });
            setTimeout(() => {
                this.props.history.push("/admin");
            }, 2000);
            setTimeout(() => {
                this.setState({
                    showMessage: true,
                    message: "Book Added!!!"
                });
            }, 1000);
        } else {
            // eslint-disable-next-line
            book.libraryInfo.numberOfCopies = parseInt(this.state.numberOfCopies);
            this.props.updateBook(book);
            this.setState({
                showMessage: true,
                message: "Updating Book..."
            });
            setTimeout(() => {
                this.props.history.push("/admin");
            }, 2000);
            setTimeout(() => {
                this.setState({
                    showMessage: true,
                    message: "Book Updated!!!"
                });
            }, 1000);
        }
    }

    cancel = () => {
        this.props.history.push("/adminBookView");
    }

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
            message: ""
        });
    };

    render() {
        return <div>
            <Header nameOfUser={this.props.activeUser.givenName} />
            <PageBase title={this.state.pageTitle}>
                <form>
                    <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        fullWidth={true}
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    // disabled={this.state.titleAvailable}
                    />
                    <TextField
                        hintText="Author"
                        floatingLabelText="Author"
                        fullWidth={true}
                        value={this.state.authorsValue}
                        onChange={this.handleAuthorChange}
                    // disabled={this.state.authorsAvailable}
                    />
                    <TextField
                        hintText="Publisher"
                        floatingLabelText="Publisher"
                        fullWidth={true}
                        value={this.state.publisher}
                        onChange={this.handlePublisherChange}
                    // disabled={this.state.publisherAvailable}
                    />
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description"
                        fullWidth={true}
                        multiLine={true}
                        rows={3}
                        value={this.state.description}
                        onChange={this.handleDescritionChange}
                    // disabled={this.state.descriptionAvailable}
                    />
                    <TextField
                        hintText="ISBN"
                        floatingLabelText="ISBN"
                        fullWidth={true}
                        value={this.state.isbnValue}
                        onChange={this.handleISBNChange}
                    // disabled={this.state.identifiersAvailable}
                    />
                    <TextField
                        hintText="Categories"
                        floatingLabelText="Categories"
                        fullWidth={true}
                        value={this.state.categoriesValue}
                        onChange={this.handleCategoriesChange}
                    // disabled={this.state.categoriesAvailable}
                    />
                    <TextField
                        hintText="Image Link"
                        floatingLabelText="Image Link"
                        fullWidth={true}
                        value={this.state.imageLinksValue}
                        onChange={this.handleImageLinksChange}
                    // disabled={this.state.imageLinksAvailable}
                    />
                    <TextField
                        floatingLabelText="numberOfCopies"
                        fullWidth={true}
                        type="number"
                        value={this.state.numberOfCopies}
                        onChange={this.handlenNumberOfCopiesChange}
                    />

                    <Divider />

                    <div style={this.styles.buttons}>
                        <CancelButton chosenName="Cancel" whenClicked={this.cancel} />
                        <SubmitButton chosenName={this.state.buttonName} whenClicked={this.action} />
                    </div>
                </form>
            </PageBase>
            <Snackbar
                open={this.state.showMessage}
                message={this.state.message}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
            />
        </div>
    }
};
const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        books: state.books,
        selectedBook: state.selectedBook,
        addingBook: state.addingBook
    };
};

const mapDispatchToProps = dispatch => ({
    addBook: (book) => dispatch(addBook(book)),
    updateBook: (book) => dispatch(updateBook(book))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookForm));
