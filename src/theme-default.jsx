import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue600, grey900 } from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
    fontFamily: 'Berlin Sans Fb',
    palette: {
    },
    appBar: {
        height: 57,
        color: blue600
    },
    raisedButton: {
        primaryColor: blue600,
    }
});

export default themeDefault;