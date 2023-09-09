import { useState, SetStateAction, useEffect, useMemo, useContext } from 'react';
import { FaKiwiBird } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { globalStrings } from '../../../globalString';
import { IUserInputContainerProps } from './IUserInputContainerProps';
import { ResourceContext } from '../../../Main';
import { VscClose } from "react-icons/vsc";
import "../UserInputContainer/UserInputContainer.scss";
import { ModalVerfiy } from '../Verfy/Verfiy';

export function UserInputContainer(props: IUserInputContainerProps) {
    let navigate = useNavigate();
    const [user, setUser] = useState<{ email: string, password: string }>({ email: "taes60711@gmail.com", password: "toto60711" });
    const ContextInfo = useContext(ResourceContext)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const ButtonText = useMemo(() => {
        let signIn: string = '';
        if (props.mode === "signIn") {
            signIn = "ログインする"
        } else {
            signIn = "登録"
        }
        console.log("UserInputContaineruseMeMo", signIn)
        let signUp: string = '';
        if (props.mode === "signIn") {
            signUp = "ユーザ登録"
        } else {
            signUp = "戻る"
        }
        console.log("UserInputContaineruseMeMo", signUp)
        return { signIn, signUp }
    }, [props.mode])

    useEffect(() => {
        console.log("UserInputContainer useEffect", props.mode)
    })

    /**
     * ログイン/登録処理する
     * @param mode ログイン/登録
     */
    const submitClick = async (mode: string) => {
        if (mode === "signIn") {
            props.setLoading(true);
            const result = await ContextInfo?.AuthService.signIn(user);
            console.log("signIn result , ", result)
            props.setLoading(false);
        } else {
            const result = await ContextInfo?.AuthService.signUp(user);
            console.log("signIn result , ", result)
        }
    }

    /**
     * 画面遷移
     * @param mode ログイン/登録
     */
    const pageNavigate = async (mode: string) => {
        if (mode === "signIn") {
            navigate("/register");
        } else {
            navigate("/");
        }
    }

    /**
     * 情報入力する
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

    //パスワード忘れた場合
    function ForgotPwd() {
        if (props.mode === "signIn") {
            return (
                <div className='signUpText'>
                    <button className='signUpButton' onClick={() => { setModalIsOpen(true) }}>パスワード忘れた場合</button>
                </div>
            );
        } else {
            return <></>
        }
    }


    return (
        <div >
            <div className='title'><FaKiwiBird size={100} color={'#ccc'} /></div>
            <div className="LoginContainer">
                <label className='inputLabel'>ログインID:
                    <input className='input' type='text' placeholder='メール' onChange={(e) => { handleUserChange(e, globalStrings.EMAIL) }} defaultValue={user.email} />
                </label>
                <label className='inputLabel'>パスワード:
                    <input className='input' type='password' placeholder='パスワード' onChange={(e) => { handleUserChange(e, globalStrings.PASSWORD) }} defaultValue={user.password} />
                </label>
                <ForgotPwd />
            </div>
            <div className='signUpConatainer'>
                <button className='signUpButton' onClick={() => { pageNavigate(props.mode) }}>{ButtonText.signUp}</button>
                <button className="signInButton" onClick={() => { submitClick(props.mode) }}>{ButtonText.signIn}</button>
            </div>
            <ModalVerfiy modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}  />
        </div>
    );
}
