import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers/rootReducer'
import { ThemeProvider } from "styled-components";
import { Theme } from './ThemeProvider/Theme'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);