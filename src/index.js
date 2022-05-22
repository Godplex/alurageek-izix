import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/styles.scss';
import 'bootstrap';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <ScrollToTop />
            <App />
        </React.StrictMode>
    </HashRouter>
);
