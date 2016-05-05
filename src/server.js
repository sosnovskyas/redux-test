'use strict';

// серверный импорт
import path from 'path'
import express from 'express'

// барахло для рендеринга
import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import counterApp from './reducers'
import App from './containers/App'

import {renderToString} from 'react-dom/server'

// import {html} from './index'

// серверные констаныт
const app = express();
const port = 3000;
const distPath = path.dirname(process.mainModule.filename);

// барахло для рендеренга
function renderFullPage(html, initialState) {
  return `<!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp);

  // Render the component to a string

  const html = renderToString(<Provider store={store}>
    <div className='app'> {/* обёртка для применения стилей*/}
      <App />
    </div>
  </Provider>);


  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}


app.use(express.static(distPath + '/static/'));

/*app.use((req, res) => {
 const store = reduxReactRouter({ routes, createHistory: createMemoryHistory })(createStore)(reducer);
 const query = qs.stringify(req.query);
 const url = req.path + (query.length ? '?' + query : '');

 store.dispatch(match(url, (error, redirectLocation, routerState) => {
 if (error) {
 console.error('Router error:', error);
 res.status(500).send(error.message);
 } else if (redirectLocation) {
 res.redirect(302, redirectLocation.pathname + redirectLocation.search);
 } else if (!routerState) {
 res.status(400).send('Not Found');
 } else {
 res.status(200).send(getMarkup(store));
 }
 }));
 });*/

app.use(handleRender);

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
});
