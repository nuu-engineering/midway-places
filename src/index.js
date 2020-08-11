import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './apps/PlacesList';
// import App from './apps/Subplaces';
// import App from './apps/People';
// import App from './apps/NewsAndPress';
// import "./css/Default.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react-places')
  // document.getElementById('react-subplaces')
  // document.getElementById('react-people')
  // document.getElementById('react-news-and-press')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
