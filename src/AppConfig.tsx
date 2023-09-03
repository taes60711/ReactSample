import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/MyComponent/Home/Home';
import RouterApp from './Component/MyComponent/RouterApp/RouterApp';


function AppConfig() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/RouterApp' element={<RouterApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppConfig;
