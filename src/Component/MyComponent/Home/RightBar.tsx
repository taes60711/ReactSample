import { Dispatch, SetStateAction, memo, useState } from "react";
import './RightBar.scss';
import ReactIcon, { IconProps } from "../../Tools/ReactIcon";

interface FinalChatMsgIprops {
    userName: string,
    iconUrl: string,
    finalMsgDate: string,
    finalMsg: string,
    type: number, //0:すべて　1:友だち　2:グループ
}

const FinalChatMsg = memo((props: {
    filterInput: string, typeInedx: number,
    setChatRoomMenuIsOpen: Dispatch<SetStateAction<boolean>>,
    setChatRoomIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    console.log("FinalChatMsg");
    const finalMsgItems: FinalChatMsgIprops[] = [{
        userName: "ユーザテキストオーヴァーフロー",
        iconUrl: "https://research.image.itmedia.co.jp/wp-content/uploads/2023/08/1692257409_27016104_m-300x225.jpg",
        finalMsgDate: "2023/09/19 18:21",
        finalMsg: "メッセージ文字数オーヴァーフロー",
        type: 1,
    },
    {
        userName: "ユーザ2",
        iconUrl: "https://gourmet.watch.impress.co.jp/img/grw/list/1522/720/1.jpg",
        finalMsgDate: "2023/10/01 08:13",
        finalMsg: "メッセージ2.....",
        type: 1,
    },
    {
        userName: "グループ",
        iconUrl: "https://www.pfirst.jp/on/demandware.static/-/Sites-pfirst-Library/ja_JP/dwd031f7f1/dogbook_top02.jpg",
        finalMsgDate: "2023/10/01 08:13",
        finalMsg: "ああああ",
        type: 2,
    }];

    let resultItems: FinalChatMsgIprops[] = [];
    if (props.typeInedx === 0) {
        if (props.filterInput) {
            let index = 0;
            finalMsgItems.map((data) => {
                if (data.userName.indexOf(props.filterInput) !== -1) {
                    resultItems.push(finalMsgItems[index]);
                }
                index++;
            });
        } else {
            resultItems = finalMsgItems;
        }
    }
    else {
        let index = 0;
        let filterItems: FinalChatMsgIprops[] = [];
        finalMsgItems.map((data) => {
            if (data.type === props.typeInedx) {
                filterItems.push(finalMsgItems[index]);
                if (props.filterInput) {
                    if (data.userName.indexOf(props.filterInput) !== -1) {
                        resultItems.push(filterItems[index]);
                    }
                } else {
                    resultItems = filterItems;
                }
            }
            index++;
        });
    }


    const ChatItem: any = (data: FinalChatMsgIprops) => {
        return (
            <div key={data.userName} className="chatUserContainer"
                onClick={() => {
                    console.log(data.userName);
                    props.setChatRoomMenuIsOpen(false);
                    props.setChatRoomIsOpen(true);
                }}>
                <img className="friendUserImg" src={data.iconUrl} alt='' />
                <div className="friendUserText">
                    <div className="userIdWithDate">
                        <div id="user">{data.userName}</div>
                        <div id="date">{data.finalMsgDate}</div>
                    </div>
                    <div className="msg">{data.finalMsg}</div>
                </div>
            </div>
        );
    };

    return (
        <>
            {resultItems.map((data) => {
                return <ChatItem key={data.userName}  {...data} />
            })}
        </>

    );
})

export interface WindowIconPops {
    iconProps: IconProps,
    onClick: () => void;
}

export const ChatRoomMenu = memo((
    props: {
        chatRoomMenuIsOpen: boolean,
        setChatRoomMenuIsOpen: Dispatch<SetStateAction<boolean>>,
        setChatRoomIsOpen: Dispatch<SetStateAction<boolean>>
    }) => {
    console.log("ChatRoom");

    const [filterInput, setFilterInput] = useState<string>("");
    const [typeInedx, setTypeInedx] = useState<number>(0);

    //ウィドウズ右上のアイコン
    const IconItems: WindowIconPops[] = [
        {
            iconProps: {
                icon: "BiSquare",
                module: "Bi",
            },
            onClick: () => { console.log(""); },
        },
        {
            iconProps: {
                icon: "AiOutlineClose",
                module: "Ai",
            },
            onClick: () => { props.setChatRoomMenuIsOpen(!props.chatRoomMenuIsOpen); },
        },
    ]

    //ウィドウズ左上のテキスト
    const displayTypeItems: string[] = [
        "すべて",
        "友だち",
        "グループ"
    ];

    /**
     * 情報入力する
     * @param e htmlイベント
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("ChatRoom Filter value: ", e.target.value.toString())
        setFilterInput(e.target.value.toString())
    }

    const chatRoomTypeOnChange = (text: string) => {
        const selectedIndex = displayTypeItems.indexOf(text);
        setTypeInedx(selectedIndex);
    }

    if (props.chatRoomMenuIsOpen) {
        return (
            <div className="chatRoomContainer">
                <div className="chatRoomTopBar">

                    <div className="TopLeftText">
                        {displayTypeItems.map((text) => {
                            if (text === displayTypeItems[typeInedx]) {
                                return <p key={text} className="choiced">{text}</p>
                            } else {
                                return <p key={text} className="unChoiced" onClick={() => { chatRoomTypeOnChange(text) }}>{text}</p>
                            }
                        })}
                    </div>

                    <div className="TopRight">
                        {IconItems.map((items) => {
                            return (
                                <div key={items.iconProps.icon} className="TopRightIcon" onClick={items.onClick}>
                                    <ReactIcon icon={items.iconProps.icon} module={items.iconProps.module} />
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className="SearchInput">
                    <ReactIcon icon={"AiOutlineSearch"} module={"Ai"} size={20} />
                    <input className="chatUserFilter" type="text" placeholder={"メッセージ検索"}
                        value={filterInput} onChange={handleInputChange} />
                </div>

                <div className="chatRoomMain">
                    <FinalChatMsg
                        filterInput={filterInput}
                        typeInedx={typeInedx}
                        setChatRoomIsOpen={props.setChatRoomIsOpen}
                        setChatRoomMenuIsOpen={props.setChatRoomMenuIsOpen} />
                </div>

            </div>
        );
    } else {
        return (
            <></>
        );
    }

})

export const RightBar = memo(() => {
    console.log("RightBar");
    const [chatRoomMenuIsOpen, setChatRoomMenuIsOpen] = useState<boolean>(false);
    const [chatRoomIsOpen, setChatRoomIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="rightLine" />
            <div className="rightbar" >
                {chatRoomIsOpen ?
                    <div className="chatroom">
                        <div className="chatroomTopbar">
                            <div className="topLeftTitle"></div>
                            <div onClick={() => { setChatRoomIsOpen(false) }}>
                                <ReactIcon icon={"AiOutlineClose"} module={"Ai"} />
                            </div>
                        </div>
                        <div className="chatroomDownbar">
                            <input type="text" />
                        </div>
                    </div>
                    :
                    <></>
                }
                <button className="chatRoomIcon" onClick={() => { setChatRoomMenuIsOpen(!chatRoomMenuIsOpen) }}>
                    <ReactIcon icon={"AiFillWechat"} module={"ai"} size={40} />
                </button>
                <ChatRoomMenu
                    chatRoomMenuIsOpen={chatRoomMenuIsOpen}
                    setChatRoomIsOpen={setChatRoomIsOpen}
                    setChatRoomMenuIsOpen={setChatRoomMenuIsOpen} />

            </div>
        </>
    );
})