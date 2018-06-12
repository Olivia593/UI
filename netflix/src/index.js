import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import appReducer from './reducer/app';
import {createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(appReducer);
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
