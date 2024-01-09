import React, { createContext,useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import EndOfRegistration from './pages/EndOfRegistration';
import Welcome from './pages/Welcome';
import Home from './pages/Home'
import Logout from './pages/Logout';
import Albums from './pages/Albums';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Info from './pages/Info';

export const UserContext = createContext();
function App() {
    const [UserData, setUserData] = useState({});
    return (

        <UserContext.Provider value={UserData}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Welcome />} />
                        <Route path='login' element={<LogIn  setUserData={setUserData} />} />
                        <Route path="register" element={<SignIn setUserData={setUserData} />} />
                        <Route path="endOfRegistration" element={<EndOfRegistration setUserData={setUserData} />} />
                        <Route path="home" element={<Home setUserData={setUserData} />} >
                            <Route path="logout" element={<Logout />} />
                            <Route path="albums" element={<Albums />} />
                            <Route path="posts" element={<Posts />} />
                            <Route path="todos" element={<Todos />} />
                            <Route path="info" element={<Info />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    )
}
export default App
