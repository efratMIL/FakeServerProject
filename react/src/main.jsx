import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import LogIn from './componnents/LogIn';
import SignIn from './componnents/SignIn';
import EndOfRegistration from './componnents/EndOfRegistration';
import LogInAndSignIn from './componnents/LogInAndSignIn';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<SignIn />} />
          <Route path="endOfRegistration" element={<EndOfRegistration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
