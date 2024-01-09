import React, { createContext, useState } from 'react';
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

export const userContext = createContext();
export const localStorageUserContext = createContext();
function App() {
    const [userData, setUserData] = useState({});
    const [localStorageUserData, setLocalStorageUserData] = useState({});
    return (
        <localStorageUserContext.Provider value={localStorageUserData}>
        <userContext.Provider value={userData}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Welcome />} />
                        <Route path='login' element={<LogIn setUserData={setUserData} />} />
                        <Route path="register" element={<SignIn setUserData={setUserData} setLocalStorageUserData={setLocalStorageUserData}/>} />
                        <Route path="endOfRegistration" element={<EndOfRegistration setUserData={setUserData} />} />
                        <Route path="home" element={<Home setUserData={setUserData} />} />
                        <Route path="albums" element={<Albums />} />
                        <Route path="posts" element={<Posts />} />
                        <Route path="todos" element={<Todos />} />
                        <Route path="info" element={<Info />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </userContext.Provider>
        </localStorageUserContext.Provider>
    )
}
export default App
