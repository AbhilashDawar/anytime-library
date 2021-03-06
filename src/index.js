import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

import 'flexboxgrid/css/flexboxgrid.css';
import './index.css';
import App from './App.jsx';
import reducers from './reducers';

const store = createStore(
    reducers
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
