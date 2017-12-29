import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

import '../styles/main.scss';

const store = configureStore(undefined);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main')
);
