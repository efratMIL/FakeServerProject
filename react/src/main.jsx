import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './componnents/LogIn';
import SignIn from './componnents/SignIn';
import EndOfRegistration from './componnents/EndOfRegistration';
import Layout from './LayOut';
import Welcome from './componnents/Welcome';
import Home from './componnents/Home'
import Logout from './componnents/Logout';
import Albums from './componnents/Albums';
import Posts from './componnents/Posts';
import Todos from './componnents/Todos';
import Info from './componnents/Info';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path='login' element={<LogIn />} />
          <Route path="register" element={<SignIn />} />
          <Route path="endOfRegistration" element={<EndOfRegistration />} />
          <Route path="home" element={<Home />} >
            <Route path="logout" element={<Logout />} />
            <Route path="albums" element={<Albums />} />
            <Route path="posts" element={<Posts />} />
            <Route path="todos" element={<Todos />} />
            <Route path="info" element={<Info />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
