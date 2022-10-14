import React from "react";
import thunk from 'redux-thunk'
import ReactDOM from "react-dom/client";  
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore,applyMiddleware,compose } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// let store=createStore(rootReducer,applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    <App />
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();