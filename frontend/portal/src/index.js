import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// configs
import store from './config/store';
import history from './config/history';

// components
import App from './components/App.jsx';

// styles
import './index.css';

ReactDOM.render(
    <Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
    </Provider>,
	document.getElementById('root')
);
