import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './Component/UserSystem/SignUp/SignUp';
import { SignIn } from './Component/UserSystem/SignIn/SignIn';
import { ISignInProps } from './Component/UserSystem/SignIn/ISignInProps';


function UserSystemConfig(props: ISignInProps) {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn setLoading={props.setLoading} />} />
                <Route path='/register' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default UserSystemConfig;
