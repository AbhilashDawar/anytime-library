import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
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
        if (this.props.activeUser.type === "USER") {
            this.props.selectBook(this.props.selectedBook);
            this.props.history.push("/bookView");
        } else if (this.props.activeUser.type === "ADMIN") {
            this.props.selectBook(this.props.selectedBook);
            this.props.history.push("/AdminBookView");
        }
    }

    render() {
        var linkStyle, imgStyle;
        if (this.state.hover) {
            linkStyle = { display: 'inline' };
            imgStyle = {
                'height': '300px',
                opacity: '1'
            };
        } else {
            linkStyle = { display: 'none' }
            imgStyle = {
                'height': '300px',
                opacity: 0.7
            }
        }
        return (
            <div className="col-xs-6 col-md-4 col-lg-3 cardWidth">
                <Paper className="bookCard" zDepth={2}>
                    <Card onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={this.openBook}>
                        <CardMedia
                            style={{ 'border': '4px solid black' }}
                            overlay={<Rating
                                style={linkStyle}
                                readOnly={true}
                                value={(this.props.selectedBook.volumeInfo.averageRating % Math.floor(this.props.selectedBook.volumeInfo.averageRating)) >= 0.5 ? Math.ceil(this.props.selectedBook.volumeInfo.averageRating) : Math.floor(this.props.selectedBook.volumeInfo.averageRating)}
                                max={5}
                            />}
                        >
                            <img src={this.props.selectedBook.volumeInfo.imageLinks.smallThumbnail} style={imgStyle} alt="" />
                        </CardMedia>
                        <CardTitle style={{ height: '100px', overflow: 'hidden' }} title={this.props.selectedBook.volumeInfo.title} />
                        <CardText>
                            Written By:<br />
                            {this.props.selectedBook.volumeInfo.authors.map((author, index) => (
                                <span key={index}><span>{author}</span><br /></span>
                            ))}
                        </CardText>
                    </Card>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser
    };
};

const mapDispatchToProps = dispatch => ({
    selectBook: (book) => dispatch(selectBook(book))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookCard));