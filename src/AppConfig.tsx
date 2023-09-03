import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Component/MyComponent/Home/Home';
import RouterApp from './Component/MyComponent/RouterApp/RouterApp';


function AppConfig() {

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/RouterApp' element={<RouterApp />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default AppConfig;
