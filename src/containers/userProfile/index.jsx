import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { ContentAddCircle } from 'material-ui/svg-icons';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Header from '../../components/header/header';
import BookCard from '../../components/bookCard';
// import CancelButton from '../bottons/cancelButton.jsx';
import SubmitButton from '../../components/bottons/submitButton.jsx';
import { profileSave } from '../../actions/updateUser.jsx';
import './userProfile.css';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chipData: this.props.activeUser.favoriteGenre,
            genre: "",
            showMessage: false,
            message: "",
            profileChanged: false
        };
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    handleRequestDelete = (data) => {
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip).indexOf(data);
        this.chipData.splice(chipToDelete, 1);
        this.setState({
            chipData: this.chipData,
            profileChanged: true
        });
    };

    handleRequestClose = () => {
        this.setState({
            showMessage: false,
            message: ""
        })
    }

    handleGenreChange = (e) => {
        this.setState({
            genre: e.target.value
        });
    };

    addGenre = () => {
        this.chipData = this.state.chipData;
        if (this.state.genre.length === 0) {
            this.setState({
                showMessage: true,
                message: "Cannot add empty string as Genre."
            })
        } else {
            if (this.chipData.indexOf(this.state.genre) >= 0) {
                this.setState({
                    showMessage: true,
                    message: "Genre already added."
                })
            } else {
                this.chipData.push(this.state.genre);
                this.setState({
                    chipData: this.chipData,
                    genre: "",
                    showMessage: true,
                    message: "Genre added successfully!!!",
                    profileChanged: true
                });
            }
        }
    };

    saveProfile = () => {
        this.user = this.props.activeUser;
        this.user.favoriteGenre = this.state.chipData;
        this.props.profileSave(this.user);
        this.setState({
            showMessage: true,
            message: "Profile saved successfully!!!"
        });
    };

    renderChip(data) {
        return (
            <Chip
                key={data}
                onRequestDelete={() => this.handleRequestDelete(data)}
                style={this.styles.chip}
            >
                {data}
            </Chip>
        );
    }

    render() {
        return (
            <div>
                <Header nameOfUser={this.props.activeUser.givenName} />
                <Card className="profileCard">
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 center-xs">
                            <img className="profileImage" src={this.props.activeUser.imageUrl} alt="No Image to show" />
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-xs-12 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 center-xs">
                            <CardTitle title={`${this.props.activeUser.givenName} ${this.props.activeUser.familyName}`} />
                        </div>
                    </div>
                    <div className="row"></div>
                    <Divider />
                    <div className="row center-xs">
                        <div className="row center-xs">
                            Favorite Genre:
                            </div>
                        <div className="row center-xs">
                            <div style={this.styles.wrapper}>
                                {this.state.chipData.map(this.renderChip, this)}
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="row center-xs">
                        <div className="col-xs-12 center-xs">
                        <TextField
                            hintText="Genre"
                            floatingLabelText="Genre"
                            value={this.state.genre}
                            onChange={this.handleGenreChange}
                        />
                        <ContentAddCircle className="addGenre" onClick={this.addGenre} />
                        </div>
                    </div>
                    <div className="row"></div>
                    <Divider />
                    <div className="row center-xs">
                        <div className="col-xs-12 center-xs">
                            <SubmitButton chosenName="Save Profile" whenClicked={this.saveProfile} />
                        </div>
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
        activeUser: state.activeUser
    };
};

const mapDispatchToProps = dispatch => ({
    profileSave: (user) => dispatch(profileSave(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserProfile);