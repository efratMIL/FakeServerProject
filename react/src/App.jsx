import React, { createContext, useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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
import { serverRequests } from './Api';

export const userContext = createContext();
export const localStorageUserContext = createContext();
export const showHeadersContext = createContext();
export const usersContext = createContext();

function App() {

    const [userData, setUserData] = useState({});
    const [localStorageUserData, setLocalStorageUserData] = useState({});
    const [showHeaders, setShowHeaders] = useState(false);
    
    return (
            <showHeadersContext.Provider value={showHeaders}>
                <localStorageUserContext.Provider value={localStorageUserData}>
                    <userContext.Provider value={userData}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout setShowHeaders={setShowHeaders} />}>
                                    <Route index element={<Welcome />} />
                                    <Route path='login' element={<LogIn setUserData={setUserData} setShowHeaders={setShowHeaders}/>} />
                                    <Route path="register" element={<SignIn setUserData={setUserData} setLocalStorageUserData={setLocalStorageUserData} />} />
                                    <Route path="endOfRegistration" element={<EndOfRegistration setUserData={setUserData} setShowHeaders={setShowHeaders}  />} />
                                    <Route path="home" element={<Home setUserData={setUserData} />} />
                                    <Route path="users/:id/info" element={<Info />} />
                                    <Route path="users/:id/albums" element={<Albums />} />
                                    <Route path="users/:id/posts" element={<Posts />} />
                                    <Route path="users/:id/todos" element={<Todos />} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </userContext.Provider>
                </localStorageUserContext.Provider>
            </showHeadersContext.Provider>
    )
}
export default App
