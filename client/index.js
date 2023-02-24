import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store';
import '../public/index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Main from './componenets/Main';


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
  <Router>
  <div>Hello, world!</div>
  <Main/>
  </Router> 
  </Provider>// make sure this is the same as the id of the div in your index.html
);