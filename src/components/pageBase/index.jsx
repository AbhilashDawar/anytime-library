import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles.jsx';

class PageBase extends React.Component {

    render() {
        return <div>
            <span style={globalStyles.navigation}>{this.props.navigation}</span>

            <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>{this.props.title}</h3>

                <Divider />
                {this.props.children}

                <div style={globalStyles.clear} />

            </Paper>
        </div >
    }
}

export default PageBase;
