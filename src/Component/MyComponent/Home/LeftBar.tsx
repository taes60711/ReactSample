import { Dispatch, memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResourceContext } from "../../../Main";
import { AuthService } from "../../../Service/AuthService";
import { IconWithTextProps, IconWithText } from "../../Tools/IconWithText";
import ReactIcon from "../../Tools/ReactIcon";
import Modal from 'react-modal';
import './LeftBar.scss';

interface ILeftBarPorps {
    settingBarIsActive: boolean;
    setSettingBarIsActive: Dispatch<React.SetStateAction<boolean>>
    setIsfoucus: Dispatch<React.SetStateAction<boolean>>
}

export const LeftBar = memo((props: ILeftBarPorps) => {
    const ContextInfo = useContext(ResourceContext);
    let navigate = useNavigate();
    console.log("LeftBar")

    //ユーザ設定画面遷移
    const toUserSetting = () => {
        navigate('/UserSetting');
    }

    //左側メンニューバーの選択項目
    function LeftBarItem() {
        const barItems: IconWithTextProps[] = [
            {
                iconAttr: {
                    icon: "AiTwotoneHome",
                    module: "fa",
                    size: 30,
                    color: '#ccc'
                }, text: "ホーム"
            },
            {
                iconAttr: {
                    icon: "FaSearch",
                    module: "fa",
                    size: 30,
                    color: '#ccc'
                }, text: "検索"
            },
            {
                iconAttr: {
                    icon: "FaUserAlt",
                    module: "fa",
                    size: 30,
                    color: '#ccc'
                }, text: "プロフィール"
            },
            {
                iconAttr: {
                    icon: "AiFillSetting",
                    module: "ai",
                    size: 30,
                    color: '#ccc'
                }, text: "設定"
            }
        ];

        return (
            <div className="LeftBarItem">
                {
                    barItems.map((data) => {
                        return <div key={data.text} className="itemButton" onClick={() => { console.log(data.text) }}>
                            <IconWithText iconAttr={data.iconAttr} text={data.text} />
                        </div>
                    })
                }
            </div>
        );
    }

    //左下のユーザ情報バー
    function SettingBar() {
        const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
        const settingBarItems: any[] = [
            {
                iconAttr: {
                    icon: "TbUserEdit",
                    module: "tb",
                    size: 30,
                    color: '#ccc'
                },
                text: "個人情報設定",
                onClickFun: () => { toUserSetting(); },
            },
            {
                iconAttr: {
                    icon: "BiLogOut",
                    module: "bi",
                    size: 30,
                    color: '#ccc'
                }, text: "ログアウト",
                onClickFun: () => { setModalIsOpen(true); },
            },
        ];
        if (props.settingBarIsActive) {
            return (
                <>
                    <div className="userSettingBarActive"
                        onMouseEnter={() => { props.setIsfoucus(true); }}
                        onMouseLeave={() => { props.setIsfoucus(false); }}
                    >
                        {settingBarItems.map((data) => {
                            return (
                                <div key={data.text} className="logout" onClick={data.onClickFun}>
                                    <IconWithText iconAttr={data.iconAttr} text={data.text} />
                                </div>
                            );
                        })}
                    </div>
                    <LogoutPop modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
                </>
            );
        } else {
            return <div className="userSettingBarUnActive" />
        }
    }

    //ログアウト確認画面
    function LogoutPop(props: { modalIsOpen: boolean, setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
        //ログアウト
        const logout = async () => {
            new AuthService().signOut();
        }
        const customStyles: Modal.Styles = {
            overlay: {
                position: 'fixed',
                zIndex: 1020,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '0.3rem',
                display: "flex",
                alignItems: 'center',
                flexDirection: "column",
            },
        };
        return (
            <Modal
                isOpen={props.modalIsOpen}
                ariaHideApp={false}
                onRequestClose={() => { props.setModalIsOpen(false) }}
                style={customStyles}
            >
                <div>{"ログアウトしますか？"}</div>
                <div className="logoutContainer">
                <button onClick={logout}>{"ログアウト"}</button>
                <button onClick={() => { props.setModalIsOpen(false) }}>{"キャンセル"}</button>
                </div>
            </Modal>
        );
    }

    return (
        <>
            <div className="leftBar">
                <div className="barItem">
                    <IconWithText iconAttr={{ icon: "FaKiwiBird", module: "fa", size: 50, color: '#ccc' }} text={"Nodon"} />
                    <LeftBarItem />
                    <div className="createButton" onClick={() => { console.log("新規投稿") }}>
                        <div>{"新規投稿"}</div>
                    </div>
                </div>

                <div className="userBar" onClick={() => {
                    props.setSettingBarIsActive(!props.settingBarIsActive);
                }}>
                    <img src={ContextInfo.currentUser.photoUrl} alt='' />
                    <div className="userTextBar">
                        <div id="userText">{ContextInfo.currentUser.name ?
                            ContextInfo.currentUser.name
                            :
                            ContextInfo.currentUser.email
                                .slice(0, ContextInfo.currentUser.email.indexOf("@"))}
                        </div>
                        <div id="userEmail">
                            {ContextInfo.currentUser.email}
                        </div>
                    </div>
                    <ReactIcon icon={'AiOutlineEllipsis'} module={'Ai'} size={25} />
                </div>
            </div>
            <SettingBar />
        </>
    );
})