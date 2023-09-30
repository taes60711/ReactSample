import { Dispatch, SetStateAction, memo, useState } from "react";
import './RightBar.scss';
import ReactIcon from "../../Tools/ReactIcon";


const ChatRoom = memo((props: { chatRoomIsOpen: boolean, setChatRoomIsOpen: Dispatch<SetStateAction<boolean>> }) => {
    console.log("ChatRoom");
    if (props.chatRoomIsOpen) {
        return (
            <div className="chatRoomContainer">
                <div className="chatRoomTopBar">
                    <div className="TopLeftText">
                        <p>{"すべて"}</p>
                        <p>{"友だち"}</p>
                        <p>{"グループ"}</p>
                    </div>
                    <div className="TopRight">
                        <div className="TopRightIcon" onClick={() => { console.log("") }}>
                            <ReactIcon icon={"BiSquare"} module={"Bi"} />
                        </div>
                        <div className="TopRightIcon" onClick={() => { props.setChatRoomIsOpen(!props.chatRoomIsOpen) }}>
                            <ReactIcon icon={"AiOutlineClose"} module={"Ai"} />
                        </div>
                    </div>
                </div>

                <div className="InputWithIcon">
                    <ReactIcon icon={"AiOutlineSearch"} module={"Ai"} size={20} />
                    <input className="chatUserFilter" type="text" placeholder={"メッセージ検索"} />
                </div>

                <div className="chatRoomMain">
                    <div className="chatUserContainer">
                        <div className="friendUserImg" />
                        <div className="friendUserText">
                            <div className="userIdWithDate">
                                <div id="user">User1</div>
                                <div id="date">2023/09/19 18:21</div>
                            </div>
                            <div className="msg">Message.....</div>
                        </div>
                    </div>
                </div>
                

            </div>
        );
    } else {
        return (
            <>
            </>
        );
    }

})

export const RightBar = memo(() => {
    console.log("RightBar");
    const [chatRoomIsOpen, setChatRoomIsOpen] = useState<boolean>(false);
    return (
        <div className="rightbar" >
            <button className="chatRoomIcon" onClick={() => { setChatRoomIsOpen(!chatRoomIsOpen) }}>
                <ReactIcon icon={"AiFillWechat"} module={"ai"} size={40} />
            </button>

            <ChatRoom
                chatRoomIsOpen={chatRoomIsOpen}
                setChatRoomIsOpen={setChatRoomIsOpen} />
        </div>
    );
})