'use strict';

import React from 'react'
import {render} from 'react-dom'

import {Provider} from 'react-redux'

import './app.css'

import App from './containers/App'
import configureStore from './store/configureStore'

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const html = (
  <Provider store={store}>
    <div className='app'> {/* обёртка для применения стилей*/}
      <App />
    </div>
  </Provider>
);

render(
  html,
  document.getElementById('root')
);
