import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import EndOfRegistration from './pages/EndOfRegistration';
import Welcome from './pages/Welcome';
import Home from './pages/Home'
import Albums from './pages/Albums';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Info from './pages/Info';
import Photos from './componnents/Photos';

export const userContext = createContext();
export const showHeadersContext = createContext();

function App() {

  
    const storedUser = JSON.parse(localStorage.getItem('thisUser')) || {};
    const storedShowHeaders = localStorage.getItem('showHeaders') === 'true';
  
    const [userData, setUserData] = useState(storedUser);
    const [showHeaders, setShowHeaders] = useState(storedShowHeaders);
  
    useEffect(() => {
      localStorage.setItem('thisUser', JSON.stringify(userData));
      localStorage.setItem('showHeaders', showHeaders);
    }, [userData, showHeaders]);
  
    return (
        <showHeadersContext.Provider value={showHeaders}>
            <userContext.Provider value={userData}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout setShowHeaders={setShowHeaders} />}>
                            <Route index element={<Welcome />} />
                            <Route path='login' element={<LogIn  setUserData={setUserData} setShowHeaders={setShowHeaders} />} />
                            <Route path="register" element={<SignIn setUserData={setUserData} />} />
                            <Route path="end-of-registration" element={<EndOfRegistration setUserData={setUserData} setShowHeaders={setShowHeaders} />} />
                            <Route path="home" element={<Home setUserData={setUserData} />} />
                            <Route path="users/:id/albums" element={<Albums />} >
                                <Route path=":albumId/photos" element={<Photos />} />
                            </Route>
                            <Route path="users/:id/posts" element={<Posts />} />
                            <Route path="users/:id/todos" element={<Todos />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </userContext.Provider>
        </showHeadersContext.Provider>
    )
}
export default App
