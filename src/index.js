import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Rehydrated } from 'aws-appsync-react';
import Amplify from "aws-amplify";
import config from "./Config/aws-config";
import { ApolloProvider } from 'react-apollo';
// import { AppSync } from "./Config/graphql-config"
import { store } from './store';
import { Provider } from 'react-redux'

// Amplify.configure(config)

ReactDOM.render(
  <Provider store={store}>
    {/* <ApolloProvider client={AppSync}> */}
      {/* <Rehydrated> */}
        <App />
      {/* </Rehydrated> */}
    {/* </ApolloProvider> */}
  </Provider >
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
