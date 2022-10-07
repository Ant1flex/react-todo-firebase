import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/styles.css';
import App from './App';
// import Provider from './store/Provider'
// import initialState from './store/state'
// import reducer from './store/reducer'
// import actions from './store/actions'
// import { Provider, initialState, reducer, actions } from './store';

ReactDOM.render(
  // <Provider initialState={initialState} reducer={reducer} actions={actions}>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  // </Provider>,
  document.getElementById('root')
);

