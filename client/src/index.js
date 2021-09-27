import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import {AuthProvider} from './context/AuthContext';
import {AuthErrorEventBus} from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import HttpClient from './network/http';
import ProductService from './service/product';

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);
const productService = new ProductService(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
      >
      <App productService = {productService}/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
