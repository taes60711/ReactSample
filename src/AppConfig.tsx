import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/MyComponent/Home/Home';
import RouterApp from './Component/MyComponent/RouterApp/RouterApp';
import { Setting } from './Component/UserSystem/Setting/Setting';


function AppConfig() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/RouterApp' element={<RouterApp />} />
                <Route path='/UserSetting' element={<Setting />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppConfig;
