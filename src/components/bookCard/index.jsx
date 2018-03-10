import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Rating } from 'material-ui-rating';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectBook } from '../../actions/selectBook.jsx';
import './bookCard.css';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hover: false }
    }

    toggleHover = () => {
        this.setState({ hover: !this.state.hover })
    }

    openBook = () => {
        this.props.selectBook(this.props.selectedBook);
        this.props.history.push("/bookView");
    }

    render() {
        var linkStyle;
        if (this.state.hover) {
            linkStyle = { display: 'inline' }
        } else {
            linkStyle = { display: 'none' }
        }
        return (
            <Card className="bookCard" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.openBook}>
                <CardMedia
                    overlay={<Rating
                        style={linkStyle}
                        readOnly={true}
                        value={Math.ceil(this.props.selectedBook.volumeInfo.averageRating)}
                        max={5}
                    />}
                >
                    <img src={this.props.selectedBook.volumeInfo.imageLinks.smallThumbnail} style={{ 'height': '300px' }} alt="" />
                </CardMedia>
                <CardTitle style={{ height: '100px', overflow: 'hidden' }} title={this.props.selectedBook.volumeInfo.title} />
                <CardText>
                    Written By:<br />
                    {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                        <span key={index}><span>{author}</span><br /></span>
                    ))}
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // selectedBook: state.selectedBook
    };
};

const mapDispatchToProps = dispatch => ({
    selectBook: (book) => dispatch(selectBook(book))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookCard));