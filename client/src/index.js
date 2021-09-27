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
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL);
const authService = new AuthService(httpClient);
const productService = new ProductService(httpClient);
const imageUploader = new ImageUploader();

const FileInput = props => (
  <ImageFileInput {...props} imageUploader = {imageUploader}/>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <App productService = {productService} authService={authService}
      authErrorEventBus={authErrorEventBus} FileInput = {FileInput}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
