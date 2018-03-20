import React from 'react';
import Paper from 'material-ui/Paper';
import { white, grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import './infoBox.css';

class InfoBox extends React.Component {

    render() {
        const Icon = this.props.Icon;

        const styles = {
            content: {
                padding: '5px 10px',
                marginLeft: 90,
                height: 80
            },
            number: {
                display: 'block',
                fontWeight: typography.fontWeightMedium,
                fontSize: 18,
                color: grey800
            },
            text: {
                fontSize: 20,
                fontWeight: typography.fontWeightLight,
                color: grey800
            },
            iconSpan: {
                float: 'left',
                height: 90,
                width: 90,
                textAlign: 'center',
                backgroundColor: this.props.color
            },
            icon: {
                height: 48,
                width: 48,
                marginTop: 20,
                maxWidth: '100%'

            }
        };

        return (
            <Paper className="infoBox">
                <span style={styles.iconSpan}>
                    <Icon color={white}
                        style={styles.icon}
                    />
                </span>

                <div style={styles.content}>
                    <span style={styles.text}>{this.props.title}</span>
                    <span style={styles.number}>{this.props.value}</span>
                </div>
            </Paper>
        );
    }
}

export default InfoBox;
