import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import store from './store/store'
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const AppComponent = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();