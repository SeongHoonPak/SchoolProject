import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import {AuthErrorEventBus, fetchCsrfToken} from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import HttpClient from './network/http';
import ProductService from './service/product';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';	
import persistedReducer from './modules';

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus, () => fetchCsrfToken());
const authService = new AuthService(httpClient);
const productService = new ProductService(httpClient);
const imageUploader = new ImageUploader();

const FileInput = props => (
  <ImageFileInput {...props} imageUploader = {imageUploader}/>
);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store)
ReactDOM.render(
    <Provider store={store}>
     <PersistGate persistor={persistor}>
    <BrowserRouter>
   
      <App productService = {productService} authService={authService}
          authErrorEventBus={authErrorEventBus}
      FileInput = {FileInput}/>
    </BrowserRouter> 
    </PersistGate>	
  </Provider>,
  document.getElementById('root')
);
