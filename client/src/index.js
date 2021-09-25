import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import {AuthProvider} from './context/AuthContext';
import {AuthErrorEventBus} from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import HttpClient from './network/http';
import TokenStorage from './db/token';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient, tokenStorage);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
      >
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
