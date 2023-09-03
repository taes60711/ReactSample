
import { SetStateAction, useState } from 'react';
import "../SignIn/SignIn.scss";
import { FaGoogle, FaKiwiBird, FaTwitter } from "react-icons/fa"

import { ISignInProps } from './ISignInProps';
import { AuthService } from '../../../Service/AuthService';
import { globalStrings } from '../../../globalString';
import React from 'react';


export function SignIn(props: ISignInProps) {
    const [user, setUser] = useState<{ email: string, password: string }>({ email: "taes60711@gmail.com", password: "toto60711" });

    /**
     * ログイン処理する
     */
    const signIn = async () => {
        props.setLoading(true);
        const result = await new AuthService().signIn(user);
        console.log("signIn result , ", result)
        props.setLoading(false);

    }

    /**
     * ログイン情報入力する
     * @param e htmlイベント
     * @param mode 入力されるテキストフィールド
     */
    const handleUserChange = (e: { target: { value: SetStateAction<string>; }; }, mode: string) => {
        if (mode === globalStrings.EMAIL) {
            setUser({ ...user, email: e.target.value.toString() })
        } else {
            setUser({ ...user, password: e.target.value.toString() })
        }
    }

    return (
        <div>
            <div className="Container">
                <div className='title'><FaKiwiBird size={100} color={'#ccc'} /></div>
                <div className="LoginContainer">
                    <label className='inputLabel'>ログインID:
                        <input className='input' type='text' placeholder='メール' onChange={(e) => { handleUserChange(e, globalStrings.EMAIL) }} defaultValue={user.email} />
                    </label>
                    <label className='inputLabel'>パスワード:
                        <input className='input' type='password' placeholder='パスワード' onChange={(e) => { handleUserChange(e, globalStrings.PASSWORD) }} defaultValue={user.password} ></input>
                    </label>
                    <div className='signUpText'>
                        <a href="" onClick={() => { }}>パスワード忘れた場合</a>
                    </div>
                </div>
                <div className='signUpConatainer'>
                    <button className='signUpButton' onClick={new AuthService().signUp}>ユーザ作成</button>
                    <button className="signInButton" onClick={signIn}>ログインする</button>
                </div>

                <div className='otherTitle'>他のアカウントでログイン</div>
                <div className='otherSignContainer'>
                    <div className='otherSignButton'>
                        <FaGoogle size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                    <div className='otherSignButton'>
                        <FaTwitter size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                </div>
            </div>
        </div>
    );
}
