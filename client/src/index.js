import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

// Reference a root in the DOM
const root = ReactDOMClient.createRoot(document.querySelector('#root'));

// Render app
root.render(<App />);