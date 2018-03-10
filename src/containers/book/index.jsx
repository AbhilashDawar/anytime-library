import React from 'react';
// import './book.css';
import appName from '../../config.jsx';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/header/header';

class Book extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                {this.props.selectedBook}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser,
        selectedBook: state.selectedBook
    };
}

export default connect(mapStateToProps)(Book);