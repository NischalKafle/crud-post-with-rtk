import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import postReducer from './redux/postSlice';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
