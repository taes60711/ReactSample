import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ResourceContext } from "../../../Main";
import './Setting.scss';

export function Setting() {
    let navigate = useNavigate();
    const ContextInfo = useContext(ResourceContext);
    const [userIcon, setUserIcon] = useState<string>(ContextInfo.currentUser.photoUrl);
    const pageClick = () => {
        navigate("/");
    }

    const [file, setFile] = useState<File>(null!);

    const inputRef = useRef<HTMLInputElement>(null!);
    const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log("onChange!", e.target.files);
        const File = e.target.files;
        if (File) {
            setFile(File[0]);
            setUserIcon(URL.createObjectURL(File[0]));
        }
    };

    const IconUpload = async () => {
        await ContextInfo.FService.updateUserIcon(ContextInfo.currentUser.uid, file);
        ContextInfo.currentUser.photoUrl = URL.createObjectURL(file)
    }

    const fileUpload = () => {
        inputRef.current.click();
    };

    return (

        <div className="Container">
            <div className="body">
                <div className="LeftContainer">

                </div>
                <div className="middle">
                    <div className="post">
                        <input type="text" placeholder={"ユーザ名"}/>
                        <input type="text" placeholder={"誕生日"}/>
                        <input type="text" placeholder={"自己紹介"}/>
                        <input type="text" placeholder={"リンク"}/>
                    </div>
                    <button onClick={pageClick}>ホームへ</button>
                </div>

                <div className="imgContainer">
                    <img src={userIcon} className="userIcon" alt='' />
                    <button id="fileSelect" type="button" onClick={fileUpload}>ファイルを選択</button>
                    <input hidden ref={inputRef} type="file" onClick={(e) => { (e.target as HTMLInputElement).value = "" }} onChange={onFileInputChange} />
                    <button onClick={IconUpload}>アイコン更新</button>
                </div>


            </div>

        </div>
    );
}



