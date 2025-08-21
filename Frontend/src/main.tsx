import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
