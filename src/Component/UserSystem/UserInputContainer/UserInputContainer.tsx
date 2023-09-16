import { useState, SetStateAction, useMemo, useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalStrings } from '../../../globalString';
import { IUserInputContainerProps } from './IUserInputContainerProps';
import { ResourceContext } from '../../../Main';
import "../UserInputContainer/UserInputContainer.scss";
import {  ModalVerfiy } from '../Verfy/Verfiy';
import ReactIcon from '../../Tools/ReactIcon';

interface IForgoPwdProps {
    mode: string;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
//パスワード忘れた場合
const ForgotPwd = memo((props: IForgoPwdProps) => {
    console.log("forgotPwd")
    if (props.mode === "signIn") {
        return (
            <div className='signUpText'>
                <button className='signUpButton' onClick={() => { props.setModalIsOpen(true) }}>パスワード忘れた場合</button>
            </div>
        );
    } else {
        return <></>
    }
})

export function UserInputContainer(props: IUserInputContainerProps) {
    let navigate = useNavigate();
    const [user, setUser] = useState<{ email: string, password: string }>({ email: "taes60711@gmail.com", password: "toto60711" });
    const ContextInfo = useContext(ResourceContext)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    console.log("UserInputContainer ", props.mode)

    const ButtonText = useMemo(() => {
        let submit: string = '';
        let back: string = '';

        if (props.mode === "signIn") {
            submit = "ログインする";
            back = "ユーザ登録";
        } else {
            submit = "登録";
            back = "戻る";
        }

        console.log("UserInputContainer ButtonText,submit", submit)
        console.log("UserInputContainer ButtonText,back", back)
        return { submit, back }
    }, [props.mode])

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
            if (result === "Sucessfull") {
                pageNavigate("/")
            }
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
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }, mode: string) => {
        if (mode === globalStrings.EMAIL) {
            setUser({ ...user, email: e.target.value.toString() })
        } else {
            setUser({ ...user, password: e.target.value.toString() })
        }
    }


    return (
        <div >
            <div className='title'>
                <ReactIcon icon={'FaKiwiBird'} module={'fa'} size={100} color={'#ccc'} />
            </div>
            <div className="LoginContainer">
                <label className='inputLabel'>ログインID:
                    <input className='input' type='text' placeholder='メール' onChange={(e) => { handleInputChange(e, globalStrings.EMAIL) }} defaultValue={user.email} />
                </label>
                <label className='inputLabel'>パスワード:
                    <input className='input' type='password' placeholder='パスワード' onChange={(e) => { handleInputChange(e, globalStrings.PASSWORD) }} defaultValue={user.password} />
                </label>
                <ForgotPwd mode={props.mode} setModalIsOpen={setModalIsOpen} />
            </div>
            <div className='signUpConatainer'>
                <button className='signUpButton' onClick={() => { pageNavigate(props.mode) }}>{ButtonText.back}</button>
                <button className="signInButton" onClick={() => { submitClick(props.mode) }}>{ButtonText.submit}</button>
            </div>
            <ModalVerfiy modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
        </div>
    );
}
