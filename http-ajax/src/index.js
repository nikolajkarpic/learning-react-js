import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// let cors = require('cors')

// App.use(cors()) // Use this after the variable declaration
// ReactDOM.render( <App />, document.getElementById( 'root' ) );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
registerServiceWorker();
